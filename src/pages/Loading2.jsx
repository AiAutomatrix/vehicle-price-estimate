import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PriceLoading from '../components/FinalLoading';

function Loading2() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const vehicleDetails = location.state?.vehicleDetails || {};
    const images = location.state?.images || [];
    // Simulate loading process
    setTimeout(() => {
      navigate('/results', { state: { images, vehicleDetails } });
    }, 2000);
  }, [navigate, location.state?.vehicleDetails, location.state?.images]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PriceLoading />
    </div>
  );
}

export default Loading2;