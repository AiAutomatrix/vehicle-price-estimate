import styled from 'styled-components';

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const DetailItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
`;

const DetailLabel = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  margin: 0 0 0.25rem;
`;

const DetailValue = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  margin: 0;
`;

const VehicleDetails = ({ make, model, year, mileage, condition }) => {
  return (
    <DetailsContainer>
      <DetailItem>
        <DetailLabel>Make</DetailLabel>
        <DetailValue>{make}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Model</DetailLabel>
        <DetailValue>{model}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Year</DetailLabel>
        <DetailValue>{year}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Mileage</DetailLabel>
        <DetailValue>{mileage}</DetailValue>
      </DetailItem>
      {condition && (
        <DetailItem>
          <DetailLabel>Condition</DetailLabel>
          <DetailValue>{condition}</DetailValue>
        </DetailItem>
      )}
    </DetailsContainer>
  );
};

export default VehicleDetails;
