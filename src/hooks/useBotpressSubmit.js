// src/hooks/useBotpressSubmit.js
import { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { useBotpressPackages } from './useBotpressPackages';
import { useBotpressListener as useBotpressListener2 } from './useBotpressListener2';
import { useBotpressListener as useBotpressListener3 } from './useBotpressListener3';

export const useBotpressSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { botpressSession } = useAppContext();
  const { sendEventToBackend } = useBotpressPackages();

  const { listenForNextBotMessage: listenForNextBotMessage2 } = useBotpressListener2();
  const { listenForNextBotMessage: listenForNextBotMessage3 } = useBotpressListener3();

  const submitFormData = useCallback(async (type, formData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    if (!botpressSession) {
      setSubmitError('Botpress session is not initialized');
      setIsSubmitting(false);
      return;
    }

    try {
      const { userKey, conversationId } = botpressSession;

      // Start listener2 before sending
      const botMessagePromise2 = listenForNextBotMessage2({ userKey, conversationId });

      // Send form data event to backend
      await sendEventToBackend(type, formData);

      // Wait for first bot message (listener2)
      const firstBotMessage = await botMessagePromise2;

      // Now start listener3 to wait for extra message
      const rawMessage3 = await listenForNextBotMessage3({ userKey, conversationId });

      // 🔍 Parse raw message from listener3 here
      let secondBotMessage = null;

      // Debug log for clarity — remove or comment out in production
      console.log('📦 Raw listener3 result:', JSON.stringify(rawMessage3, null, 2));

      if (
        rawMessage3?.type === 'text' ||
        rawMessage3?.data?.payload?.type === 'text'
      ) {
        const msg = rawMessage3?.data?.payload ? rawMessage3.data.payload : rawMessage3;

        secondBotMessage = {
          type: msg.type,
          text: msg.text,
          id: msg.id || rawMessage3?.data?.id || rawMessage3.id,
          createdAt: msg.createdAt || rawMessage3?.data?.createdAt || rawMessage3.createdAt,
        };
      } else {
        console.warn('⚠️ Unexpected message format from listener3:', rawMessage3);
      }

      return { firstBotMessage, secondBotMessage };
    } catch (err) {
      console.error('❌ Submission error:', err);
      setSubmitError(err.message || 'Submission failed');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [botpressSession, sendEventToBackend, listenForNextBotMessage2, listenForNextBotMessage3]);

  return { isSubmitting, submitError, submitFormData };
};
