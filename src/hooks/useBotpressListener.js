// src/hooks/useBotpressListener.js
import { useState, useCallback, useRef, useEffect } from 'react';
import { useAppContext, BASE_URL } from '../context/AppContext';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const useBotpressListener = ({ onMessage, onEvent, onUser }) => {
  const [connected, setConnected] = useState(false);
  const [apiError, setApiError] = useState(null);
  const abortCtrl = useRef(null);
  const retries = useRef(0);
  const MAX_RETRIES = 5;
  const { botpressSession } = useAppContext();

  const stop = useCallback(() => {
    console.log('🛑 Stopping SSE');
    abortCtrl.current?.abort();
    setConnected(false);
  }, []);

  const start = useCallback(() => {
    if (!botpressSession) {
      console.warn('❌ No Botpress session');
      return;
    }

    const { userKey, conversationId } = botpressSession;
    const url = `${BASE_URL}/conversations/${conversationId}/listen`;
    console.log('🔌 Opening SSE to', url);

    abortCtrl.current?.abort();
    const controller = new AbortController();
    abortCtrl.current = controller;

    fetchEventSource(url, {
      signal: controller.signal,
      headers: { 'x-user-key': userKey },
      onopen: () => {
        console.log('✅ SSE connected');
        setConnected(true);
        retries.current = 0;
      },
      onmessage: evt => {
        console.log('📨 raw SSE event:', evt.data);
        if (evt.data === 'ping') {
          console.log('↔️ Received ping');
          return;
        }
        try {
          const packet = JSON.parse(evt.data);
          const { type, data } = packet;
          switch (type) {
            case 'message_created':
              onMessage?.(data.payload, packet);
              stop();
              break;
            case 'event_created':
              onEvent?.(data.payload, packet);
              break;
            case 'user_created':
              onUser?.(data.payload, packet);
              break;
            default:
              console.warn(`⚠️ Unhandled packet type: ${type}`);
          }
        } catch (err) {
          console.error('❌ SSE parse error:', err);
        }
      },
      onerror: err => {
        console.error('❌ SSE error:', err);
        setConnected(false);
        if (retries.current < MAX_RETRIES) {
          const backoff = Math.pow(2, ++retries.current) * 1000;
          console.warn(`🔁 reconnect #${retries.current} in ${backoff/1000}s`);
          setTimeout(start, backoff);
        } else {
          console.error('🚫 Max SSE retries reached');
          setApiError('SSE max retries reached');
        }
      }
    });
  }, [botpressSession, onMessage, onEvent, onUser, stop]);

  useEffect(() => () => stop(), [stop]);

  return { connected, apiError, start, stop };
};