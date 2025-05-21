// src/hooks/useBotpressPackages.js
import { useState, useEffect, useRef } from 'react';
import { useAppContext, BASE_URL } from '../context/AppContext';
import { useBotpressListener } from './useBotpressListener';

const EVENTS_ENDPOINT = `${BASE_URL}/events`;

export const useBotpressPackages = () => {
  const { botpressSession } = useAppContext();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const resolverRef = useRef(null);

  // Start listener and resolve when message_created arrives
  const { start, stop } = useBotpressListener({
    onMessage: (payload) => {
      if (payload.type === 'text' && payload.text) {
        const pkgList = payload.text
          .split(',')
          .map(p => p.trim())
          .filter(p => p);
        setPackages(pkgList);
        if (resolverRef.current) {
          resolverRef.current(pkgList);
          resolverRef.current = null;
        }
      }
    }
  });

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const waitForPackages = () => new Promise(resolve => {
    resolverRef.current = resolve;
  });

  const sendEventToBackend = async (type, payload = {}) => {
    if (!botpressSession) {
      setApiError('Botpress session is not initialized');
      return;
    }
    setIsLoading(true);
    setApiError(null);

    try {
      // Begin listening for the response
      start();

      // Send event to Botpress
      const res = await fetch(EVENTS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-key': botpressSession.userKey
        },
        body: JSON.stringify({
          conversationId: botpressSession.conversationId,
          payload: { type, channel: 'web', ...payload }
        })
      });
      if (!res.ok) throw new Error('Event failed');

      // Wait for the listener to resolve with packages
      const pkgList = await waitForPackages();
      return pkgList;
    } catch (err) {
      console.error('❌ Error sending event:', err);
      setApiError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, apiError, packages, sendEventToBackend };
};