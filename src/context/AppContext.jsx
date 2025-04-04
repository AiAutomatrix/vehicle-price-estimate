import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [vehicleData, setVehicleData] = useState(null);
  const [valuationResult, setValuationResult] = useState(null);
  const [valuationHistory, setValuationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeImage = async (imageFile) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, call your API here
      const result = {
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        mileage: '45,000',
        condition: 'Good'
      };
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
      // In a real app, call your API here
      const result = {
        price: '$24,500',
        breakdown: [
          { label: 'Base Market Value', value: '$26,000' },
          { label: 'Mileage Adjustment', value: '-$1,200', isNegative: true },
          { label: 'Condition Adjustment', value: '-$300', isNegative: true },
        ],
        range: {
          low: '$22,000',
          high: '$27,000',
          current: '$24,500',
        }
      };
      setValuationResult(result);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        make: data.make,
        model: data.model,
        year: data.year,
        date: new Date().toISOString().split('T')[0],
        price: result.price,
        image: 'car-placeholder.png'
      };
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
      // In a real app, call your API here
      const history = [
        {
          id: 1,
          make: 'Toyota',
          model: 'Camry',
          year: '2020',
          date: '2023-05-15',
          price: '$24,500',
          image: 'car-placeholder.png',
        },
        {
          id: 2,
          make: 'Honda',
          model: 'Civic',
          year: '2018',
          date: '2023-04-22',
          price: '$18,200',
          image: 'car-placeholder.png',
        },
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
        clearError: () => setError(null)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
