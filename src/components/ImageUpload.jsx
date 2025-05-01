// src/components/ImageUpload.jsx
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import { useAppContext } from '../context/AppContext';

const HiddenInput = styled.input`
  display: none;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* Match VehicleForm button width & centering */
  width: 100%;
  max-width: 300px;        /* same max-width you have for your Get Packages button */
  margin: 0 auto;          /* center it */
  
  padding: 0.58rem 1.05rem; /* same padding as your form button */
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const UploadText = styled.span`
  margin-left: 0.5rem;
  font-size: 0.95rem;
`;

const Label = styled.label`
  width: 100%;
`;

const ImageUpload = () => {
  const { setImages } = useAppContext();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImages(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Label>
      <HiddenInput
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <ImageUploadContainer>
        <UploadIcon width={30} height={18} fill="white" />
        <UploadText>Upload Image</UploadText>
      </ImageUploadContainer>
    </Label>
  );
};

export default ImageUpload;
