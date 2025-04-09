import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const CommonProblemsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const CommonProblems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle } = location.state || {};

  return (
    <>
      <Header />
      <CommonProblemsContainer>
        <h1>Research Common Problems</h1>
        {vehicle && (
          <>
            <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <p>Here you can research common problems for your vehicle.</p>
            {/* Add API integration or data for common problems here */}
          </>
        )}
        <button onClick={() => navigate('/results', { state: { vehicle } })}>Back</button>
        {!vehicle && <p>No vehicle data available.</p>}
      </CommonProblemsContainer>
    </>
  );
};

export default CommonProblems;