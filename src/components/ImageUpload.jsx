import React from 'react';
// import { useNavigate } from 'react-router-dom';
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



const ImageUpload = ({ onImageUpload }) => {
  // const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];
    const uploadedFiles = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          onImageUpload(uploadedFiles);
        }
      };
      reader.readAsDataURL(file);
      uploadedFiles.push(file);
    });
  };

  return (
    <label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        multiple // Allow multiple files
      />
      <ImageUploadContainer>
        <>
          <UploadIcon width={48} height={48} fill="#2563eb" />
          <UploadText>Upload vehicle photos</UploadText>
          <CameraIcon width={24} height={24} fill="#64748b" />
        </>
      </ImageUploadContainer>
    </label>
  );
};

export default ImageUpload;
