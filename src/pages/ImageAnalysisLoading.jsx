import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAppContext } from '../context/AppContext';

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

const ImageAnalysisLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { analyzeImage } = useAppContext();
  const images = location.state?.images || [];
  const nextRoute = location.state?.nextRoute;

  useEffect(() => {
    console.log('ImageAnalysisLoading: nextRoute from state:', nextRoute); // Log nextRoute
    console.log('ImageAnalysisLoading: images from state:', images); // Log images

    if (images.length > 0) {
      console.log('ImageAnalysisLoading: Starting image analysis'); // Log action
      analyzeImage(images[0])
        .then(vehicleData => {
          console.log('ImageAnalysisLoading: Image analysis successful, navigating to:', nextRoute); // Log navigation path
          navigate(nextRoute, { state: { vehicleDetails: vehicleData, images: images } });
        })
        .catch(error => {
          console.error("Image analysis failed:", error);
          navigate('/error', { state: { message: "Failed to analyze image." } });
        });
    }
  }, [location, navigate, analyzeImage, images, nextRoute]);

  return (
    <LoadingContainer>
      <LoadingMessage>Analyzing Vehicle Image...</LoadingMessage>
      <Loader />
    </LoadingContainer>
  );
};

export default ImageAnalysisLoading;