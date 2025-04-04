import styled, { keyframes } from 'styled-components';

const progressAnimation = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const LoaderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin: 1.5rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primaryLight}, ${({ theme }) => theme.colors.primary});
  border-radius: 4px;
  width: ${props => props.progress}%;
  animation: ${progressAnimation} 0.5s ease-out;
`;

const ProgressText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.5rem 0 0;
`;

const ProgressLoader = ({ progress }) => {
  return (
    <LoaderContainer>
      <h3>Analyzing Vehicle Image</h3>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      <ProgressText>{progress}% Complete</ProgressText>
    </LoaderContainer>
  );
};

export default ProgressLoader;
