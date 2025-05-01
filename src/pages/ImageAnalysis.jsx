import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import Footer
import { useAppContext } from '../context/AppContext';

// ... (Styled components remain the same)
const ImageAnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto; /* Added margin for spacing */
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  color: ${({ theme }) => theme.colors.textPrimary}; /* Ensure text color inherits */
`;

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  padding: 1rem;
  /* Limit width if needed, or make it responsive */
  max-width: 100%; /* Ensure it doesn't overflow container */
  width: 500px; /* Or adjust as needed */
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary}; /* Optional bg */
  margin-bottom: 1.5rem; /* Spacing below carousel */
`;

const CarouselImage = styled.img`
  /* Adjust styling for potentially variable image sizes */
  width: 100%; /* Let container control width */
  height: 300px; /* Fixed height */
  object-fit: cover; /* Cover the area, might crop */
  scroll-snap-align: start;
  border-radius: ${({ theme }) => theme.radii.sm}; /* Smaller radius */
  box-shadow: ${({ theme }) => theme.shadows.sm}; /* Lighter shadow */
`;

const DetectedDetails = styled.div`
  margin-top: 1.5rem; /* Adjusted spacing */
  padding: 1.5rem; /* More padding */
  width: 100%; /* Take full width */
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface}; /* Use surface color */
  color: ${({ theme }) => theme.colors.textPrimary};

  h3 {
    margin-top: 0; /* Remove top margin */
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.25rem; /* Slightly larger heading */
  }

  p {
    margin-bottom: 0.75rem; /* More spacing between lines */
     color: ${({ theme }) => theme.colors.textSecondary}; /* Use secondary text color */
  }
  p:last-child {
      margin-bottom: 0;
  }
`;

const MockAnalysis = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  width: 100%; /* Take full width */
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textTertiary}; /* Use tertiary color */
  text-align: center;
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
  justify-content: center; /* Center buttons */
  gap: 1rem;
  margin-top: 2rem;
  width: 100%; /* Take full width */
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme, variant }) => variant === 'secondary' ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme, variant }) => variant === 'secondary' ? theme.colors.textOnSecondary : theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md}; /* Match other radii */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background-color: ${({ theme, variant }) => variant === 'secondary' ? theme.colors.secondaryDark : theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral};
    color: ${({ theme }) => theme.colors.textTertiary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;


function ImageAnalysis() {
  const { setImages, uploadedImages } = useAppContext(); // Get uploadedImages here
  const location = useLocation();
  const navigate = useNavigate();

  // Use uploadedImages from context if location state is missing (e.g., page refresh)
  const imagesToDisplay = location.state?.images || uploadedImages || [];

  // Mock vehicle details - replace with actual analysis result
  const vehicleDetails = location.state?.vehicleDetails || {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    condition: 'Good',
  };

  const handleStartNew = () => {
    setImages([]); // Clear images in context
    navigate('/');
  };

  const handlePriceEstimate = () => {
      // Pass details and the images currently displayed
    navigate('/loading2', { state: { vehicleDetails, images: imagesToDisplay } });
  };

  // The component structure was a bit nested, simplifying it
  return (
    <>
      <Header />
      <ImageAnalysisContainer>
        <h1>Image Analysis</h1>
        {imagesToDisplay && imagesToDisplay.length > 0 ? (
          <CarouselContainer>
            {imagesToDisplay.map((image, index) => (
              <CarouselImage
                key={index}
                // Check if image is a File object (from upload) or string (from state/refresh)
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt={`Uploaded Vehicle ${index + 1}`}
                // Revoke object URL on unmount if created, requires more state management or useEffect
              />
            ))}
          </CarouselContainer>
        ) : (
          <p>No images available for analysis.</p> // More informative message
        )}
        <MockAnalysis>
          Simulated Image Analysis: Identifying vehicle make, model, year, and potential condition...
        </MockAnalysis>
        <DetectedDetails>
          <h3>Detected Vehicle Details (Mock):</h3>
          <p><strong>Make:</strong> {vehicleDetails.make}</p>
          <p><strong>Model:</strong> {vehicleDetails.model}</p>
          <p><strong>Year:</strong> {vehicleDetails.year}</p>
          <p><strong>Condition:</strong> {vehicleDetails.condition}</p>
        </DetectedDetails>
        <ButtonContainer>
          {/* Use variant prop for styling */}
          <Button onClick={handleStartNew} variant="secondary">New Estimate</Button>
          <Button onClick={handlePriceEstimate}>Get Price Estimate</Button>
        </ButtonContainer>
      </ImageAnalysisContainer>
      <Footer /> {/* Add Footer here */}
    </>
  );
}

export default ImageAnalysis;
