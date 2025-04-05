import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageAnalysisLoading from '../components/ImageAnalysisLoading';

import { useMemo } from 'react';
// import { useLocation } from 'react-router-dom';

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const images = useMemo(() => location.state?.images || [], [location.state?.images]);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      navigate('/analyze', { state: { images } });
    }, 2000);
  }, [navigate, images]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ImageAnalysisLoading />
    </div>
  );
}

export default Loading;