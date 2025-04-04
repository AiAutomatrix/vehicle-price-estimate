import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import VehicleForm from '../components/VehicleForm';
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleImageUpload = (file) => {
    // In a real app, you would upload the image to your backend
    console.log('Image uploaded:', file);
    navigate('/analyze');
  };

  const handleManualEntry = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    navigate('/results');
  };

  return (
    <>
      <Header />
      <HomeContainer>
        <Title>Get Your Vehicle's Value</Title>
        <Subtitle>Upload a photo or enter details manually for an instant valuation</Subtitle>
        
        {!showForm ? (
          <>
            <ImageUpload onImageUpload={handleImageUpload} />
            <Divider>or</Divider>
            <button onClick={handleManualEntry}>Enter Details Manually</button>
          </>
        ) : (
          <VehicleForm onSubmit={handleFormSubmit} />
        )}
      </HomeContainer>
    </>
  );
};

export default Home;
