import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const VehicleReviewsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const VehicleReviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle } = location.state || {};

  return (
    <>
      <Header />
      <VehicleReviewsContainer>
        <h1>Get Vehicle Reviews</h1>
        {vehicle && (
          <>
            <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <p>Here you can find reviews for your vehicle.</p>
            {/* Add API integration or data for vehicle reviews here */}
          </>
        )}
        <button onClick={() => navigate('/results', { state: { vehicle } })}>Back</button>
        {!vehicle && <p>No vehicle data available.</p>}
      </VehicleReviewsContainer>
    </>
  );
};

export default VehicleReviews;