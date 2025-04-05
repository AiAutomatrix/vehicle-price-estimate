import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import VehicleForm from './VehicleForm';
import Header from '../components/Header';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center !important; /* Force centering with !important */
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;


const Home = () => {
  const navigate = useNavigate();

  const handleImageUpload = (file) => {
   navigate('/loading', { state: { images: file } });
  };

  const handleFormSubmit = (formData) => {
    navigate('/results', { state: { vehicleDetails: formData } });
  };

  return (
    <>
      <Header />
      <HomeContainer>
        <Title>Get Your Vehicle's Value</Title>
        <Subtitle>Upload a photo or enter details manually</Subtitle>
        <ImageUpload onImageUpload={handleImageUpload} />
        <VehicleForm onSubmit={handleFormSubmit} />
      </HomeContainer>
    </>
  );
};

export default Home;
