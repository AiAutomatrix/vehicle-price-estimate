import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg';
import { ReactComponent as RestartIcon } from '../assets/icons/restart.svg';
import { ReactComponent as SaveIcon } from '../assets/icons/save.svg';
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

const ButtonBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

const ShareButton = styled(Button)`
  flex-direction: row;
`;

const ValuationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicle = location.state?.vehicleDetails || {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    mileage: '45000',
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

  const handleStartNew = () => {
    navigate('/');
  };

  const handleSave = () => {
    console.log('Saving valuation report');
    // Implement save functionality
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
        
        <ButtonBar>
          <Button onClick={handleStartNew}>
            <RestartIcon width={20} height={20} fill="white" />
            <span>Restart</span>
          </Button>
          <Button onClick={handleSave}>
            <SaveIcon width={20} height={20} fill="white" />
            <span>Save Report</span>
          </Button>
          <ShareButton onClick={handleShare}>
            <ShareIcon width={20} height={20} fill="white" />
            <span>Share Report</span>
          </ShareButton>
        </ButtonBar>
      </ResultsContainer>
    </>
  );
};

export default ValuationResults;
