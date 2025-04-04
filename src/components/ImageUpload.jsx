import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import { ReactComponent as CameraIcon } from '../assets/icons/camera.svg';

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.card};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const UploadText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  margin: 0;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        style={{ display: 'none' }} 
      />
      <ImageUploadContainer>
        {preview ? (
          <PreviewImage src={preview} alt="Vehicle preview" />
        ) : (
          <>
            <UploadIcon width={48} height={48} fill="#2563eb" />
            <UploadText>Upload vehicle photo</UploadText>
            <CameraIcon width={24} height={24} fill="#64748b" />
          </>
        )}
      </ImageUploadContainer>
    </label>
  );
};

export default ImageUpload;
