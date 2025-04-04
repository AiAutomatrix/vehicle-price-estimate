import { useState } from 'react';

export const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    if (validate) {
      setErrors(validate({
        ...values,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    setValues
  };
};
