import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 95%; /* Make form wider, same as ImageUpload */
  max-width: 1000px; /* Increased max width for form */
  background-color: ${({ theme }) => theme.colors.surface}; /* Use surface color like HomeContainer and ImageUpload */
  padding-top: 1rem; /* Further reduced vertical padding */
  padding-bottom: 1rem; /* Further reduced vertical padding */
  padding-left: 2rem;  /* Keep horizontal padding */
  padding-right: 2rem; /* Keep horizontal padding */
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-top: 2rem; /* Add margin to separate from ImageUpload */
  align-self: center; /* Ensure form is centered within HomeContainer */
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

// Mock data for dropdowns
const MAKES = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz'];
const MODELS = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus'],
  Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Camaro'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
};

const YEARS = Array.from({ length: 25 }, (_, i) => 2023 - i);

const VehicleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
  });

  const [availableModels, setAvailableModels] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'make') {
      setAvailableModels(MODELS[value] || []);
      setFormData(prev => ({ ...prev, model: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.mileage) newErrors.mileage = 'Mileage is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <FormContainer>
      
      <form onSubmit={handleSubmit} style={{width: '100%'}}> {/* Added style to make form element wider */}
        <FormGroup>
          <Label htmlFor="make">Make</Label>
          <Select
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          >
            <option value="">Select Make</option>
            {MAKES.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </Select>
          {errors.make && <ErrorMessage>{errors.make}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="model">Model</Label>
          <Select
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            disabled={!formData.make}
          >
            <option value="">Select Model</option>
            {availableModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </Select>
          {errors.model && <ErrorMessage>{errors.model}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="year">Year</Label>
          <Select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            {YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          {errors.year && <ErrorMessage>{errors.year}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            type="number"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="Enter mileage"
            required
          />
          {errors.mileage && <ErrorMessage>{errors.mileage}</ErrorMessage>}
        </FormGroup>

        <Button type="submit">Get Valuation</Button>
      </form>
    </FormContainer>
  );
};

export default VehicleForm;