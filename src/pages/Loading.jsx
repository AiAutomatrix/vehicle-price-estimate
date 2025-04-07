import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageAnalysisLoading from '../components/ImageAnalysisLoading';

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const vehicleDetails = location.state?.vehicleDetails || {};
    const images = location.state?.images || [];
    // Simulate loading process
    setTimeout(() => {
      navigate('/analyze', { state: { images, vehicleDetails } });
    }, 2000);
  }, [navigate, location.state?.vehicleDetails, location.state?.images]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ImageAnalysisLoading />
    </div>
  );
}

export default Loading;