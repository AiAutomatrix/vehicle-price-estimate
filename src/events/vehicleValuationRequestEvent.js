import { BASE_URL, initializeSession, fetchMessages } from './shared'

export const handleVehicleValuationRequest = async (valuationData) => {
  try {
    const session = await initializeSession()
    if (!session) throw new Error('Session failed')

    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-key': session.userKey
      },
      body: JSON.stringify({
        conversationId: session.conversationId,
        payload: {
          type: 'vehicle-valuation-request',
          channel: 'web',
          ...valuationData
        }
      })
    })

    if (!res.ok) throw new Error('Event failed')

    const eventResponse = await res.json()
    await new Promise(r => setTimeout(r, 9000))
    const msgs = await fetchMessages()

    return { eventResponse, msgs }
  } catch (err) {
    console.error('❌ Vehicle Valuation Error:', err)
    throw err
  }
}
