
export const lightTheme = {
    colors: {
      primary: '#6b8bbd', // Muted blue-gray
      primaryLight: '#9bb7de',
      primaryDark: '#4a6572',
      background: '#E0DACD', // Muted Beige
      card: '#F5F5DC', // Beige
      surface: '#FFF8DC', // Cornsilk
      backgroundSecondary: '#f0f0f0', // Slightly darker light gray
      textPrimary: '#333333', // Dark gray text
      textSecondary: '#555555', // Medium gray text
      textTertiary: '#777777', // Light gray text
      border: '#d0d0d0', // Light gray border
      divider: '#e0e0e0', // Very light gray divider
      accent: '#8ab4f8', // Light cool blue accent
      success: '#4caf50',
      warning: '#ffc107',
      error: '#f44336',
      text: '#333333', // Default text color for light theme
      headerBackground: '#F5F5DC', // Beige header background
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    radii: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
  };
  
  export const darkTheme = {
      isDarkMode: true,
      colors: {
        // Modern Dark Theme - Cool Tones
        primary: '#64748b',         // Steel Blue
        primaryLight: '#a3b1c8',
        primaryDark: '#4a5568',
        background: '#1e293b',      // Dark navy background
        card: '#2d3748',            // Darker blue-gray cards
        surface: '#2d3748',
        backgroundSecondary: '#374151', // Slightly lighter navy
        divider: '#4b5563',
        border: '#6b7280',
        outline: '#9ca3af',
        textPrimary: '#f0f0f0',      // Off-white text
        textSecondary: '#d4d4d8',    // Light gray text
        textTertiary: '#a1a1aa',     // Medium gray text
        textDisabled: '#71717a',
        accent: '#94a3b8',          // Light steel blue accent
        success: '#6ee7b7',
        warning: '#fcd34d',
        error: '#f87171',
        info: '#67e8f9',
        text: '#f0f0f0', // Default text color for dark theme
        headerBackground: '#374151', // Darker beige for dark theme
      },
      shadows: {
        sm: '0 2px 4px 0 rgba(0, 0, 0, 0.3)', // Softer shadows
        md: '0 6px 8px -1px rgba(0, 0, 0, 0.4), 0 3px 5px -1px rgba(0, 0, 0, 0.3)',
        lg: '0 12px 16px -3px rgba(0, 0, 0, 0.4), 0 6px 8px -2px rgba(0, 0, 0, 0.3)',
      },
      radii: {
        sm: '6px',
        md: '10px',
        lg: '14px',
      },
    };