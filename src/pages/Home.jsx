import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import VehicleForm from './VehicleForm';
import Header from '../components/Header';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 2rem;
`;


const Home = () => {
  const navigate = useNavigate();

  const handleImageUpload = (file) => {
   console.log('handleImageUpload called with:', file);
   // In a real app, you would upload the image to your backend
   console.log('Image uploaded:', file);
   navigate('/loading', { state: { images: file } });
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    navigate('/results', { state: { vehicleDetails: formData } });
  };

  return (
    <>
      <Header />
      <HomeContainer>
        <Title>Get Your Vehicle's Value</Title>
        <Subtitle>Upload a photo or enter details manually for an instant valuation</Subtitle>
        
        <ImageUpload onImageUpload={handleImageUpload} />
        <VehicleForm onSubmit={handleFormSubmit} />
      </HomeContainer>
    </>
  );
};

export default Home;
