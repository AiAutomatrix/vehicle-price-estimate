// src/hooks/useBotpressListener2.js
import { useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../context/AppContext';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const useBotpressListener = () => {
  const listenForNextBotMessage = useCallback(async ({ userKey, conversationId }) => {
    const messagesUrl = `${BASE_URL}/conversations/${conversationId}/messages`;
    const listenUrl = `${BASE_URL}/conversations/${conversationId}/listen`;

    try {
      // Fetch and log existing messages
      const res = await axios.get(messagesUrl, {
        headers: { 'x-user-key': userKey }
      });
      const existingMessages = res.data.messages || [];
      console.log('📜 Current Botpress messages:', existingMessages);

      // Track current length to detect new additions
      const initialMessageCount = existingMessages.length;

      // Start SSE to wait for next bot message
      return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
          reject(new Error('Timeout: No bot message received.'));
        }, 15000); // 15 second timeout

        console.log('🔌 Listening for next bot message at', listenUrl);

        fetchEventSource(listenUrl, {
          signal: controller.signal,
          headers: { 'x-user-key': userKey },

          onopen: () => {
            console.log('✅ SSE connected');
          },

          onmessage: async (evt) => {
            if (evt.data === 'ping') return;

            try {
              const packet = JSON.parse(evt.data);
              const { type, data } = packet;

              if (type === 'message_created' && data.userId !== userKey) {
                // Re-fetch full message list to see latest
                const updateRes = await axios.get(messagesUrl, {
                  headers: { 'x-user-key': userKey }
                });
                const newMessages = updateRes.data.messages || [];

                console.log('🆕 Updated message list:', newMessages);
                const newBotMessage = newMessages.find((m, i) => i >= initialMessageCount && m.userId !== userKey);

                const payload = typeof newBotMessage?.payload === 'string'
                  ? JSON.parse(newBotMessage.payload)
                  : newBotMessage?.payload;

                controller.abort();
                clearTimeout(timeout);

                console.log('🤖 Parsed new bot message:', payload);
                resolve(payload);
              }
            } catch (err) {
              controller.abort();
              clearTimeout(timeout);
              console.error('❌ SSE parsing error:', err);
              reject(err);
            }
          },

          onerror: (err) => {
            controller.abort();
            clearTimeout(timeout);
            console.error('❌ SSE connection error:', err);
            reject(err);
          }
        });
      });
    } catch (err) {
      console.error('❌ Failed to fetch existing messages or start SSE:', err);
      throw err;
    }
  }, []);

  return { listenForNextBotMessage };
};
