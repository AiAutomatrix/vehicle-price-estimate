import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressLoader from './ProgressLoader';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ImageCarouselPlaceholder = styled.div`
  margin-top: 20px;
  // Add styles for image carousel placeholder if needed
`;

const ImageAnalysisLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/image-analysis'); // Navigate to ImageAnalysis page after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [navigate]);

  return (
    <LoadingContainer>
      <ProgressLoader isLoading={true} />
      <ImageCarouselPlaceholder>
        {/* Image Carousel will be placed here */}
        <p>Image Carousel Loading...</p>
      </ImageCarouselPlaceholder>
      <p>Analyzing your vehicle image...</p>
    </LoadingContainer>
  );
};

export default ImageAnalysisLoading;