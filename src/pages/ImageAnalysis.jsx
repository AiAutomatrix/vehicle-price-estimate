import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';

const ImageAnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  padding: 1rem;
  width: 500px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const CarouselImage = styled.img`
  width: 100%;
  max-height: 300px;
  height: auto;
  scroll-snap-align: start;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DetectedDetails = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  
  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

const MockAnalysis = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

function ImageAnalysis() {
  const { setImages } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const images = location.state?.images || [];
  const vehicleDetails = location.state?.vehicleDetails || {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    condition: 'Good',
  };

  const handleStartNew = () => {
    setImages([]);
    navigate('/');
  };

  const ImageAnalysisComponent = () => {
    const navigate = useNavigate();
  const { uploadedImages } = useAppContext();
  const handlePriceEstimate = () => {
    navigate('/loading2', { state: { vehicleDetails, images: uploadedImages } });
  };

  
  return (
    <>
      <Header />
      <ImageAnalysisContainer>
        <h1>Image Analysis</h1>
          {images && images.length > 0 ? (
            <CarouselContainer>
              {images.map((image, index) => (
                <CarouselImage
                  key={index}
                  src={image}
                  alt={`Uploaded Vehicle ${index + 1}`}
                />
              ))}
            </CarouselContainer>
          ) : (
            <p>No images uploaded.</p>
          )}
          <MockAnalysis>
            Simulated Image Analysis: Identifying vehicle make, model, and year...
          </MockAnalysis>
          <DetectedDetails>
            <h3>Detected Vehicle Details:</h3>
            <p>Make: {vehicleDetails.make}</p>
            <p>Model: {vehicleDetails.model}</p>
            <p>Year: {vehicleDetails.year}</p>
            <p>Condition: {vehicleDetails.condition}</p>
          </DetectedDetails>
          <ButtonContainer>
            <Button onClick={handleStartNew}>New Estimate</Button>
            <Button onClick={handlePriceEstimate}>Price Estimate</Button>
          </ButtonContainer>
      </ImageAnalysisContainer>
    </>
  );
}

  return <ImageAnalysisComponent />;
}

export default ImageAnalysis;