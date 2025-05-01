import ImageUpload from '../components/ImageUpload';
import { useAppContext } from '../context/AppContext';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useBotpressForm } from '../hooks/useBotpressForm';
import { saveFormData } from '../scripts/formDataStore';

const FormContainer = styled.div`
  width: 95%;
  max-width: 1000px;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin: 2rem auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.75rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ApiErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : '#ccc')};
  border-radius: 25px;
  transition: background-color 0.3s;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 3px;
  left: ${({ active }) => (active ? '25px' : '3px')};
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  transition: left 0.3s;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 300px) {
    flex-direction: row;
    justify-content: center;

    & > *:only-child {
      margin: 0 auto;
    }
  }
`;

const FullWidthButton = styled(Button)`
  width: auto;
  @media (min-width: 300px) {
    width: 100%;
    max-width: 300px;
  }
`;

const VehicleForm = ({ onSubmit }) => {
  const { distanceUnit } = useAppContext();
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mileageUnit, setMileageUnit] = useState(distanceUnit === 'metric' ? 'kilometers' : 'miles');

  const validateForm = (values) => {
    const errors = {};
    if (!values.make) errors.make = 'Make is required';
    if (!values.model) errors.model = 'Model is required';
    if (!values.year) errors.year = 'Year is required';
    return errors;
  };

  const {
    values: formData,
    errors,
    isLoading,
    apiError,
    handleChange,
    sendEventToBackend,
    resetForm
  } = useBotpressForm({
    make: '',
    model: '',
    year: '',
    mileage: ''
  }, validateForm);

  const handleGetPackages = async () => {
    if (Object.keys(errors).length > 0) return;

    try {
      const { parsedList } = await sendEventToBackend('vehicle-form-data', {
        action: 'get-packages',
        vehicle: { make: formData.make, model: formData.model, year: formData.year },
        mileageUnit
      });

      setPackages(parsedList);
      setShowDropdown(true);
      setSelectedPackage(''); // Reset selected package when getting new packages
    } catch (error) {
      console.error('Failed to get packages:', error);
    }
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handleToggleMileageUnit = () => {
    const newUnit = mileageUnit === 'miles' ? 'kilometers' : 'miles';
    setMileageUnit(newUnit);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionErrors = validateForm(formData);
    if (!formData.mileage) submissionErrors.mileage = 'Mileage is required';
    if (Object.keys(submissionErrors).length > 0) return;

    try {
      const fullFormData = {
        vehicle: {
          make: formData.make,
          model: formData.model,
          year: formData.year,
          mileage: formData.mileage,
          mileageUnit: mileageUnit
        },
        selectedPackage: selectedPackage || null
      };

      console.log('Submitting full form data with selected package:', fullFormData);
      const result = await sendEventToBackend('vehicle-valuation-request', fullFormData);
      await saveFormData(formData, sendEventToBackend);
      console.log('Form submitted successfully:', result);
      
      onSubmit(formData);
      resetForm();
      setSelectedPackage('');
      setShowDropdown(false);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="year">Year</Label>
          <Input 
            id="year" 
            name="year" 
            value={formData.year} 
            onChange={handleChange} 
            placeholder="Enter year" 
            disabled={isLoading} 
          />
          {errors.year && <ErrorMessage>{errors.year}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="make">Make</Label>
          <Input 
            id="make" 
            name="make" 
            value={formData.make} 
            onChange={handleChange} 
            placeholder="Enter make" 
            disabled={isLoading} 
          />
          {errors.make && <ErrorMessage>{errors.make}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="model">Model</Label>
          <Input 
            id="model" 
            name="model" 
            value={formData.model} 
            onChange={handleChange} 
            placeholder="Enter model" 
            disabled={isLoading} 
          />
          {errors.model && <ErrorMessage>{errors.model}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <ButtonGroup>
            <ImageUpload 
              onImageUpload={(images) => {
                if (images.length > 0) {
                  sendEventToBackend('vehicle-images-uploaded', {
                    imageCount: images.length
                  });
                }
              }} 
              disabled={isLoading} 
            />
            <FullWidthButton 
              type="button" 
              onClick={handleGetPackages} 
              disabled={!formData.model || isLoading}
            >
              {isLoading ? <LoadingSpinner /> : 'Get Packages'}
            </FullWidthButton>
          </ButtonGroup>
        </FormGroup>

        {showDropdown && (
          <FormGroup>
            <Label htmlFor="package">Select a Package</Label>
            <Select 
              id="package" 
              name="package" 
              value={selectedPackage} 
              onChange={handlePackageChange} 
              disabled={isLoading}
            >
              <option value="">-- Select a Package --</option>
              {packages.map((pkg, index) => (
                <option key={index} value={pkg}>{pkg}</option>
              ))}
            </Select>
          </FormGroup>
        )}

        <FormGroup>
          <Label htmlFor="mileage">Mileage ({mileageUnit})</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Input 
              type="number" 
              id="mileage" 
              name="mileage" 
              value={formData.mileage} 
              onChange={handleChange} 
              placeholder="Enter mileage" 
              disabled={isLoading} 
            />
            <ToggleContainer onClick={!isLoading ? handleToggleMileageUnit : undefined}>
              <ToggleSwitch active={mileageUnit === 'miles'}>
                <ToggleButton active={mileageUnit === 'miles'} />
              </ToggleSwitch>
            </ToggleContainer>
          </div>
          {errors.mileage && <ErrorMessage>{errors.mileage}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <ButtonGroup>
            <FullWidthButton 
              type="submit" 
              disabled={isLoading || (showDropdown && !selectedPackage)}
            >
              {isLoading ? <><LoadingSpinner /> Processing...</> : 'Get Valuation'}
            </FullWidthButton>
          </ButtonGroup>
        </FormGroup>
      </form>

      {apiError && <ApiErrorMessage>{apiError}</ApiErrorMessage>}
    </FormContainer>
  );
};

export default VehicleForm;