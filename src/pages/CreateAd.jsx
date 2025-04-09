import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateAdContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const CreateAd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle } = location.state || {};

  return (
    <>
      <Header />
      <CreateAdContainer>
        <h1>Create Vehicle Ad</h1>
        {vehicle && (
          <>
            <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <p>Here you can create an ad for your vehicle.</p>
            {/* Add form or API integration for ad creation here */}
          </>
        )}
        <button onClick={() => navigate('/results', { state: { vehicle } })}>Back</button>
        {!vehicle && <p>No vehicle data available.</p>}
      </CreateAdContainer>
    </>
  );
};

export default CreateAd;