export const validateVehicleForm = (values) => {
    const errors = {};
    
    if (!values.make) {
      errors.make = 'Make is required';
    }
    
    if (!values.model) {
      errors.model = 'Model is required';
    }
    
    if (!values.year) {
      errors.year = 'Year is required';
    } else if (isNaN(values.year)) {
      errors.year = 'Year must be a number';
    }
    
    if (!values.mileage) {
      errors.mileage = 'Mileage is required';
    } else if (isNaN(values.mileage)) {
      errors.mileage = 'Mileage must be a number';
    } else if (values.mileage < 0) {
      errors.mileage = 'Mileage cannot be negative';
    }
    
    return errors;
  };
  