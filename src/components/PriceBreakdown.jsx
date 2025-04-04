import styled from 'styled-components';

const BreakdownContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const BreakdownLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const BreakdownValue = styled.span`
  color: ${props => props.isNegative ? props.theme.colors.error : props.theme.colors.success};
  font-weight: 600;
`;

const BreakdownTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
`;

const TotalLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const TotalValue = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  font-size: 1.125rem;
`;

const PriceBreakdown = ({ items }) => {
  return (
    <BreakdownContainer>
      <h3>Price Breakdown</h3>
      {items.map((item, index) => (
        <BreakdownItem key={index}>
          <BreakdownLabel>{item.label}</BreakdownLabel>
          <BreakdownValue isNegative={item.isNegative}>
            {item.value}
          </BreakdownValue>
        </BreakdownItem>
      ))}
      <BreakdownTotal>
        <TotalLabel>Estimated Value</TotalLabel>
        <TotalValue>$24,500</TotalValue>
      </BreakdownTotal>
    </BreakdownContainer>
  );
};

export default PriceBreakdown;
