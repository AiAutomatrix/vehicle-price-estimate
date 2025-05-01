
// Mock API functions for the Vehicle Value Estimator
export const analyzeVehicleImage = async (imageFile) => {
    // In a real app, this would upload to your backend
    console.log('Uploading image for analysis...', imageFile);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock data
    return {
      success: true,
      data: {
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        mileage: '45,000',
        condition: 'Good',
        confidence: 0.92
      }
    };
  };
  
  export const estimateVehicleValue = async (vehicleData) => {
    // In a real app, this would call your valuation API
    console.log('Estimating value for:', vehicleData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      success: true,
      data: {
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
        },
        valuationDate: new Date().toISOString()
      }
    };
  };
  
  export const getValuationHistory = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: [
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
      ]
    };
  };
