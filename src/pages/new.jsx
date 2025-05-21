const VehicleForm = ({ onSubmit }) => {
    // ... other state ...
  
    const {
      isLoading: isLoadingPackages,
      apiError: packagesError,
      packages,
      sendEventToBackend
    } = useBotpressPackages();
  
    const handleGetPackages = async () => {
      if (Object.keys(errors).length > 0) return;
  
      try {
        setShowDropdown(false);
        await sendEventToBackend('vehicle-form-data', {
          action: 'get-packages',
          vehicle: { 
            make: formData.make, 
            model: formData.model, 
            year: formData.year 
          },
          mileageUnit
        });
        setShowDropdown(true);
        setSelectedPackage('');
      } catch (error) {
        console.error('Failed to get packages:', error);
        setShowDropdown(false);
      }
    };
  
    // ... rest of the component ...
  };