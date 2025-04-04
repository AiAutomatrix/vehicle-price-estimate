import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CarImage = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const CarInfo = styled.div`
  flex: 1;
`;

const CarTitle = styled.h4`
  margin: 0 0 0.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CarDetails = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const CarPrice = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const HistoryItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/results', { state: { vehicle: item } });
  };

  return (
    <ItemContainer onClick={handleClick}>
      <CarImage src={require(`../assets/images/${item.image}`)} alt={`${item.make} ${item.model}`} />
      <CarInfo>
        <CarTitle>{item.year} {item.make} {item.model}</CarTitle>
        <CarDetails>Valuation on {item.date}</CarDetails>
      </CarInfo>
      <CarPrice>{item.price}</CarPrice>
    </ItemContainer>
  );
};

export default HistoryItem;
