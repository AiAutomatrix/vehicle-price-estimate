import styled from 'styled-components';

const RangeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const RangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const RangeLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const RangeBar = styled.div`
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  position: relative;
  margin: 1rem 0;
`;

const RangeFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primaryLight}, ${({ theme }) => theme.colors.primary});
  border-radius: 4px;
  width: ${props => props.percentage}%;
`;

const RangeMarker = styled.div`
  position: absolute;
  top: -6px;
  width: 2px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.text};
  left: ${props => props.percentage}%;
  transform: translateX(-50%);

  &::after {
    content: '${props => props.value}';
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const ValueRange = ({ low, high, current }) => {
  // Convert prices to numbers (remove $ and commas)
  const lowNum = parseFloat(low.replace(/[^0-9.-]+/g, ''));
  const highNum = parseFloat(high.replace(/[^0-9.-]+/g, ''));
  const currentNum = parseFloat(current.replace(/[^0-9.-]+/g, ''));
  
  // Calculate percentage position of current value
  const range = highNum - lowNum;
  const position = ((currentNum - lowNum) / range) * 100;

  return (
    <RangeContainer>
      <RangeHeader>
        <RangeLabel>Low: {low}</RangeLabel>
        <RangeLabel>High: {high}</RangeLabel>
      </RangeHeader>
      <RangeBar>
        <RangeFill percentage={position} />
        <RangeMarker percentage={position} value={current} />
      </RangeBar>
    </RangeContainer>
  );
};

export default ValueRange;
