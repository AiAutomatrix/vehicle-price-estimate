import React from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import { ReactComponent as CameraIcon } from '../assets/icons/camera.svg';

const ImageUploadContainer = styled.div`
  width: 100%; /* Make button width match VehicleForm section width */
  /* max-width: 1000px; Maximum width for ImageUpload button - Removed max-width constraint */
  align-self: center; /* Center ImageUpload button horizontally */
  display: flex;
  margin-right: 100px;
  flex-direction: row; /* Arrange icon and text horizontally */
  align-items: center;
  justify-content: center;
  padding-top: 0.6rem; /* Even shorter top padding */
  padding-bottom: 0.5rem; /* Even shorter bottom padding */
  padding-left: 2rem;
  padding-right: 2rem;
  gap: 1rem; /* Adjust gap for horizontal layout */
  background-color: ${({ theme }) => theme.colors.primary}; /* Primary color background */
  color: white; /* White text color */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */
  box-shadow: ${({ theme }) => theme.shadows.md}; /* Add shadow */

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark}; /* Darker primary on hover */
    transform: scale(1.05); /* Slight scale up on hover */
  }

  &:active {
    transform: scale(0.98); /* Slight scale down on press */
  }
`;

const UploadText = styled.p`
  color: white; /* White text color to match container */
  font-size: 1.1rem; /* Slightly larger font size */
  font-weight: 1200; /* Semi-bold text */
  margin-bottom: 0.1rem; /* Add some bottom margin */
  text-align: center; /* Center align text */
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
          <UploadIcon width={24} height={24} fill="white" /> {/* Larger icon and white fill */}
          <UploadText>Upload Car Image</UploadText>
        </>
      </ImageUploadContainer>
    </label>
  );
};

export default ImageUpload;


