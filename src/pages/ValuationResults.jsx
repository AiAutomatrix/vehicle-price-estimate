import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg';
import { ReactComponent as RestartIcon } from '../assets/icons/restart.svg';
import { ReactComponent as SaveIcon } from '../assets/icons/save.svg';
import Header from '../components/Header';
import PriceDisplay from '../components/PriceDisplay';
import PriceBreakdown from '../components/PriceBreakdown';
import ValueRange from '../components/ValueRange';
import { useAppContext } from '../context/AppContext';


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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SaveConfirmation = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.success}, ${({ theme }) => theme.colors.primary});
  background-size: 200% 200%;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out, ${fadeOut} 0.3s ease-in 2.7s forwards;
`;

const ValuationResults = () => {
  const [isSaveConfirmed, setIsSaveConfirmed] = useState(false);
  const { setImages } = useAppContext();
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
    setImages([]);
    navigate('/');
  };

   const handleSave = async () => {
    const report = {
      vehicle: vehicle,
      valuation: valuation,
    };
    const reportId = Date.now();
    localStorage.setItem(`report-${reportId}`, JSON.stringify(report));
    console.log('Valuation report saved:', reportId, report);
    setIsSaveConfirmed(true);
    setTimeout(() => {
      setIsSaveConfirmed(false);
    }, 2000);
  };

  const handleShare = () => {
    console.log('Sharing valuation report');
    // Implement share functionality
  };

  return (
    <>
      <Header />
      {isSaveConfirmed && <SaveConfirmation>Report Saved!</SaveConfirmation>}
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
            <span>New Estimate</span>
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
        <ButtonBar>
          <Button onClick={() => navigate('/create-ad', { state: { vehicle } })}>
            <span>Create Vehicle Ad</span>
          </Button>
          <Button onClick={() => navigate('/common-problems', { state: { vehicle } })}>
            <span>Research Common Problems</span>
          </Button>
          <Button onClick={() => navigate('/vehicle-reviews', { state: { vehicle } })}>
            <span>Get Vehicle Reviews</span>
          </Button>
        </ButtonBar>
      </ResultsContainer>
    </>
  );
};

export default ValuationResults;
