import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';

const AppContext = createContext();

// Botpress configuration
export const WEBHOOK_ID = '8871b949-aead-4c1a-ab33-66985139a10b';
export const BASE_URL = `https://chat.botpress.cloud/${WEBHOOK_ID}`;

export const AppProvider = ({ children }) => {
  // --- Existing State ---
  const [vehicleData, setVehicleData] = useState(null);
  const [valuationResult, setValuationResult] = useState(null);
  const [valuationHistory, setValuationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previousPage, setPreviousPage] = useState('/');
  const [currency, setCurrency] = useState('USD');
  const [distanceUnit, setDistanceUnit] = useState('miles');

  // --- Botpress Session State ---
  const [botpressSession, setBotpressSession] = useState(null);
  const [botpressError, setBotpressError] = useState(null);

  // --- Theme State ---
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme || 'light';
  });

  // --- Botpress Initialization Ref ---
  const isInitializingRef = useRef(false);

  // --- Botpress Functions ---
  const initializeBotpressSession = useCallback(async () => {
    if (botpressSession || isInitializingRef.current) {
      console.log('🛑 Botpress session already initialized or initializing, skipping...');
      return botpressSession;
    }

    isInitializingRef.current = true;
    setBotpressError(null);
    console.log('🔄 Initializing Botpress session...');

    try {
      // Create user
      const cu = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      });
      if (!cu.ok) throw new Error('Failed to create user');
      const { key: userKey } = await cu.json();

      // Create conversation
      const conversationId = crypto.randomUUID();
      const cc = await fetch(`${BASE_URL}/conversations/get-or-create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-key': userKey
        },
        body: JSON.stringify({ id: conversationId })
      });
      if (!cc.ok) throw new Error('Failed to create conversation');

      const newSession = { userKey, conversationId };
      setBotpressSession(newSession);
      console.log('✅ New Botpress session created:', newSession);
      return newSession;

    } catch (err) {
      console.error('🔴 Botpress initialization failed:', err);
      setBotpressError(err.message);
      throw err;
    } finally {
      isInitializingRef.current = false;
    }
  }, [botpressSession]);

  // Initialize session when app loads
  useEffect(() => {
    const initBotpress = async () => {
      if (!botpressSession && !isInitializingRef.current) {
        console.log('🔄 Initializing Botpress on component mount...');
        try {
          await initializeBotpressSession();
        } catch (error) {
          console.error('Initial session initialization failed:', error);
        }
      } else {
        console.log('⏩ Botpress session already exists or is initializing, skipping...');
      }
    };

    initBotpress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botpressSession, initializeBotpressSession]);

  // --- Theme Functions ---
  const toggleTheme = () => {
    setThemeMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // --- Existing Functions ---
  const setImages = (images) => setUploadedImages(images);

  const analyzeImage = async (imageFile) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = { make: 'Toyota', model: 'Camry', year: '2020', mileage: '45,000', condition: 'Good' };
      setVehicleData(result);
      return result;
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const estimateValue = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = {
        price: '$24,500',
        breakdown: [
          { label: 'Base Market Value', value: '$26,000' },
          { label: 'Mileage Adjustment', value: '-$1,200', isNegative: true },
          { label: 'Condition Adjustment', value: '-$300', isNegative: true }
        ],
        range: { low: '$22,000', high: '$27,000', current: '$24,500' }
      };
      setValuationResult(result);
      const historyItem = { id: Date.now(), make: data.make, model: data.model, year: data.year, date: new Date().toISOString().split('T')[0], price: result.price, image: 'car-placeholder.png' };
      setValuationHistory(prev => [historyItem, ...prev]);
      return result;
    } catch (err) {
      setError('Failed to estimate value. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const history = [
        { id: 1, make: 'Toyota', model: 'Camry', year: '2020', date: '2023-05-15', price: '$24,500', image: 'car-placeholder.png' },
        { id: 2, make: 'Honda', model: 'Civic', year: '2018', date: '2023-04-22', price: '$18,200', image: 'car-placeholder.png' }
      ];
      setValuationHistory(history);
      return history;
    } catch (err) {
      setError('Failed to load history. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        vehicleData,
        valuationResult,
        valuationHistory,
        isLoading,
        error,
        analyzeImage,
        estimateValue,
        loadHistory,
        setVehicleData,
        clearError: () => setError(null),
        setImages,
        uploadedImages,
        currency,
        setCurrency,
        distanceUnit,
        setDistanceUnit,
        previousPage,
        setPreviousPage,
        themeMode,
        toggleTheme,
        botpressSession,
        botpressError,
        initializeBotpressSession
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
