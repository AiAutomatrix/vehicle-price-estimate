// src/hooks/useBotpressForm.js
import { useState, useEffect, useCallback } from 'react'
import { useBotpressListener } from './useBotpressListener'

const WEBHOOK_ID = '5fa42c48-fe97-43a5-9a5d-f1581220dffe'
const BASE_URL   = `https://chat.botpress.cloud/${WEBHOOK_ID}`

export const useBotpressForm = (initialState, validate) => {
  const [values, setValues]           = useState(initialState)
  const [errors, setErrors]           = useState({})
  const [isLoading, setIsLoading]     = useState(false)
  const [apiError, setApiError]       = useState(null)
  const [initialized, setInitialized] = useState(false)

  const {
    connected,
    apiError: listenerError,
    stop: stopPolling,
    fetchMessages
  } = useBotpressListener({ /* …your callbacks…*/ })

  // surface listener errors
  useEffect(() => {
    if (listenerError) setApiError(listenerError)
  }, [listenerError])

  // on mount: always clear old session so we get a brand-new conversation
  useEffect(() => {
    localStorage.removeItem('xUserKey')
    localStorage.removeItem('conversationId')
    setInitialized(false)
  }, [])

  const initialize = useCallback(async () => {
    if (initialized) {
      const userKey        = localStorage.getItem('xUserKey')
      const conversationId = localStorage.getItem('conversationId')
      return userKey && conversationId
        ? { userKey, conversationId }
        : null
    }

    console.log('🔄 Initializing Botpress session...')
    try {
      // Create user
      const cu = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      })
      if (!cu.ok) throw new Error('Failed to create user')
      const { key: userKey } = await cu.json()

      // Create brand-new conversation
      const conversationId = crypto.randomUUID()
      const cc = await fetch(`${BASE_URL}/conversations/get-or-create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-key': userKey
        },
        body: JSON.stringify({ id: conversationId })
      })
      if (!cc.ok) throw new Error('Failed to create conversation')

      // Persist for this session
      localStorage.setItem('xUserKey', userKey)
      localStorage.setItem('conversationId', conversationId)
      setInitialized(true)

      console.log('✅ New Botpress session created:', { userKey, conversationId })
      return { userKey, conversationId }
    } catch (err) {
      console.error('🔴 Initialization failed:', err)
      setApiError(err.message)
      return null
    }
  }, [initialized])

  // make sure to init once
  useEffect(() => {
    initialize()
    return () => { stopPolling() }
  }, [initialize, stopPolling])

  const sendEventToBackend = useCallback(async (type, payload = {}) => {
    setIsLoading(true)
    setApiError(null)

    try {
      console.log('📤 Sending event:', type, payload)
      const session = await initialize()
      if (!session) throw new Error('Session failed')

      // send the event
      const res = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-key': session.userKey
        },
        body: JSON.stringify({
          conversationId: session.conversationId,
          payload: { type, channel: 'web', ...payload }
        })
      })
      if (!res.ok) throw new Error('Event failed')
      const eventResponse = await res.json()
      console.log('📨 Event response:', eventResponse)

      // save userId
      localStorage.setItem('userId', eventResponse.event.userId)

      // **wait 8s** for the bot to reply
      await new Promise(r => setTimeout(r, 9000))

      // fetch all messages (newest first)
      const msgs = await fetchMessages()
      console.log('📋 All convo messages:', msgs)

      // pick the very first one
      let parsedList = []
      if (msgs.length) {
        const first = msgs[0]
        const pl = typeof first.payload === 'string'
          ? JSON.parse(first.payload)
          : first.payload

        if (pl.type === 'text' && typeof pl.text === 'string') {
          parsedList = pl.text
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        }
      }
      console.log('📥 Parsed dropdown list:', parsedList)

      return { eventResponse, msgs, parsedList }

    } catch (err) {
      console.error('❌ sendEvent failed:', err)
      setApiError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [initialize, fetchMessages])

  const handleChange = e => {
    const { name, value } = e.target
    setValues(v => {
      const nv = { ...v, [name]: value }
      if (validate) setErrors(validate(nv))
      return nv
    })
  }

  const resetForm = () => {
    setValues(initialState)
    setErrors({})
    setApiError(null)
  }

  return {
    values,
    errors,
    isLoading,
    apiError,
    connected,
    handleChange,
    setValues,
    sendEventToBackend,
    resetForm
  }
}
