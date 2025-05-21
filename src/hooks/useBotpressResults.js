import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { useBotpressListener3 } from './useBotpressListener3'; // Your listener3 hook

// Example parser, replace with your actual parser function
const parseBotMessage = (botMessage) => {
  try {
    // Assume botMessage.payload.text contains JSON or structured text
    return JSON.parse(botMessage.payload.text);
  } catch {
    return { raw: botMessage.payload.text || '' };
  }
};

export const useBotpressResults = ({ trigger }) => {
  const { botpressSession } = useAppContext();
  const { userKey, conversationId } = botpressSession || {};

  const [parsedResults, setParsedResults] = useState(null);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [resultsError, setResultsError] = useState(null);

  const { listenForNextBotMessage: listenForNextBotMessage3 } = useBotpressListener3();

  const fetchResults = useCallback(async () => {
    if (!userKey || !conversationId) {
      setResultsError('Missing Botpress session info');
      return;
    }

    setIsLoadingResults(true);
    setResultsError(null);
    setParsedResults(null);

    try {
      // Wait for the detailed bot message from listener3
      const botMessage = await listenForNextBotMessage3({ userKey, conversationId });

      // Parse it
      const parsed = parseBotMessage(botMessage);
      setParsedResults(parsed);
    } catch (err) {
      console.error('❌ Listener3 error:', err);
      setResultsError(err.message || 'Failed to get results');
    } finally {
      setIsLoadingResults(false);
    }
  }, [userKey, conversationId, listenForNextBotMessage3]);

  // Run fetchResults when "trigger" changes to true
  useEffect(() => {
    if (trigger) {
      fetchResults();
    }
  }, [trigger, fetchResults]);

  return { parsedResults, isLoadingResults, resultsError };
};
