import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LoadingMessage = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Loader = styled.div`
  border: 8px solid ${({ theme }) => theme.colors.border};
  border-top: 8px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NewLoading = ({ message }) => {
  return (
    <LoadingContainer>
      <LoadingMessage>{message}</LoadingMessage>
      <Loader />
    </LoadingContainer>
  );
};

export default NewLoading;