// src/hooks/useBotpressSubmit.js
import { useState } from 'react';
import { useBotpressListener } from './useBotpressListener';
import { useAppContext } from '../context/AppContext';

export const useBotpressSubmit = () => {
  const { 
    botpressSession, 
    initializeBotpressSession 
  } = useAppContext();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { fetchMessages } = useBotpressListener();

  const submitFormData = async (type, payload) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Ensure we have a session
      const session = botpressSession || await initializeBotpressSession();
      
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
      });
      if (!res.ok) throw new Error('Submission failed');
      
      // ... rest of your submission logic
    } catch (err) {
      setSubmitError(err.message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitError,
    submitFormData
  };
};