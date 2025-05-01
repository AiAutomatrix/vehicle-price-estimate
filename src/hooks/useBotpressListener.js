// src/hooks/useBotpressListener.js
import { useState, useEffect, useRef, useCallback } from 'react';

const BASE_API = 'https://chat.botpress.cloud';

export const useBotpressListener = ({ onMessage, onEvent, onUser }) => {
  const [connected, setConnected] = useState(false);
  const [apiError, setApiError]   = useState(null);
  const eventSourceRef            = useRef(null);

  const initSession = useCallback(() => {
    const userKey        = localStorage.getItem('xUserKey');
    const conversationId = localStorage.getItem('conversationId');
    const webhookId      = localStorage.getItem('webhookId');
    if (!userKey || !conversationId || !webhookId) return null;
    return { userKey, conversationId, webhookId };
  }, []);

  const start = useCallback(() => {
    const sess = initSession();
    if (!sess) {
      console.warn('🚨 Missing session info for SSE');
      return;
    }
    const { userKey, conversationId, webhookId } = sess;
    const url =
      `${BASE_API}/${webhookId}/conversations/${conversationId}/listen` +
      `?x-user-key=${encodeURIComponent(userKey)}`;

    // Only create one EventSource
    if (eventSourceRef.current) return;

    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onopen = () => {
      console.log('📡 SSE connected');
      setConnected(true);
    };

    es.onmessage = evt => {
      try {
        const packet = JSON.parse(evt.data);
        if (packet.type === 'message') onMessage?.(packet.payload, packet);
        else if (packet.type === 'event') onEvent?.(packet.payload, packet);
        else if (packet.type === 'user') onUser?.(packet.payload, packet);
      } catch (e) {
        console.error('⚠️ SSE parse error', e);
      }
    };

    es.onerror = err => {
      console.error('🛑 SSE error', err);
      setApiError(err.message || 'SSE error');
      es.close();
      eventSourceRef.current = null;
      setConnected(false);
    };
  }, [initSession, onMessage, onEvent, onUser]);

  const stop = useCallback(() => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
    setConnected(false);
    console.log('🧹 SSE stopped');
  }, []);

  const fetchMessages = useCallback(async () => {
    const sess = initSession();
    if (!sess) throw new Error('No session');
    const { userKey, conversationId, webhookId } = sess;
    const res = await fetch(
      `${BASE_API}/${webhookId}/conversations/${conversationId}/messages`,
      { headers: { 'x-user-key': userKey } }
    );
    if (!res.ok) throw new Error('Failed to fetch messages');
    return (await res.json()).messages;
  }, [initSession]);

  return { connected, apiError, start, stop, fetchMessages };
};
