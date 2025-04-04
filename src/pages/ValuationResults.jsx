import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg';
import Header from '../components/Header';
import PriceDisplay from '../components/PriceDisplay';
import PriceBreakdown from '../components/PriceBreakdown';
import ValueRange from '../components/ValueRange';

const ResultsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const VehicleTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const VehicleSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ValuationResults = () => {
  // Mock data
  const vehicle = {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    mileage: '45,000',
  };

  const valuation = {
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
  };

  const handleShare = () => {
    console.log('Sharing valuation report');
    // Implement share functionality
  };

  return (
    <>
      <Header />
      <ResultsContainer>
        <ResultsHeader>
          <VehicleTitle>{vehicle.year} {vehicle.make} {vehicle.model}</VehicleTitle>
          <VehicleSubtitle>{vehicle.mileage} miles</VehicleSubtitle>
        </ResultsHeader>

        <PriceDisplay price={valuation.price} />
        <ValueRange 
          low={valuation.range.low} 
          high={valuation.range.high} 
          current={valuation.range.current} 
        />
        <PriceBreakdown items={valuation.breakdown} />
        
        <ShareButton onClick={handleShare}>
          <ShareIcon width={20} height={20} fill="white" />
          Share Report
        </ShareButton>
      </ResultsContainer>
    </>
  );
};

export default ValuationResults;
