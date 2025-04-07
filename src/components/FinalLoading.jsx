import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Spinner = styled.div`
  border: 5px solid ${({ theme }) => theme.colors.border};
  border-top: 5px solid ${props => props.color};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
`;

const FinalLoading = () => {
  const [loadingText, setLoadingText] = useState("Getting Vehicle Details");
  const [color, setColor] = useState("red");

  useEffect(() => {
    const textOptions = ["Getting Vehicle Details", "Evaluating Details", "Creating Price Estimate"];
    const colorOptions = ["red", "blue", "green"];
    let i = 0;

    const intervalId = setInterval(() => {
      setLoadingText(textOptions[i]);
      setColor(colorOptions[i]);
      i = (i + 1) % textOptions.length;
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadingContainer>
      <Spinner color={color} />
      <LoadingText>{loadingText}</LoadingText>
    </LoadingContainer>
  );
};

export default FinalLoading;