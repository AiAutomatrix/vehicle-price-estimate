import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import { useAppContext } from '../context/AppContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import ImageUpload from '../components/ImageUpload';
import VehicleForm from './VehicleForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center !important; /* Force centering with !important */
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
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

// eslint-disable-next-line no-unused-vars
  const handleImageUpload = (file) => {
   navigate('/loading', { state: { images: file } });
  };
  const handleFormSubmit = (formData) => {
    const hasImages = uploadedImages.length > 0;
    const targetRoute = hasImages ? '/loading' : '/loading2';
    navigate(targetRoute, { state: { vehicleDetails: formData, images: uploadedImages } });
  };

  const { uploadedImages } = useAppContext();

  return (
    <>
      <Header />
      <HomeContainer>
        <Title>Get Your Vehicle's Value</Title>
        <Subtitle>Upload a photo or enter details manually</Subtitle>
        {uploadedImages.length > 0 && (
          <ImageCarousel images={uploadedImages} />
        )}
        <VehicleForm onSubmit={handleFormSubmit} />
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;
