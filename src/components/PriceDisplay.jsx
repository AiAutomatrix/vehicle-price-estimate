import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PriceContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: ${fadeIn} 0.5s ease-out;
`;

const PriceLabel = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  font-size: 1rem;
`;

const PriceValue = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0 0;
  font-size: 3rem;
  font-weight: 800;
`;

const PriceDisplay = ({ price }) => {
  const { currency } = useAppContext();

  let currencySymbol;
  switch (currency) {
    case 'USD':
      currencySymbol = '$';
      break;
    case 'EUR':
      currencySymbol = '€';
      break;
    case 'GBP':
      currencySymbol = '£';
      break;
    case 'CAD':
      currencySymbol = 'C$';
      break;
    default:
      currencySymbol = '$';
  }
  return (
    <PriceContainer>
      <PriceLabel>Estimated Value</PriceLabel>
      <PriceValue>{currencySymbol}{price.replace(/[^0-9.]/g, '')}</PriceValue>
    </PriceContainer>
  );
};

export default PriceDisplay;
