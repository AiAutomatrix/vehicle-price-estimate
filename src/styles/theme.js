
export const lightTheme = {
    colors: {
      primary: '#2563eb',
      primaryLight: '#3b82f6',
      primaryDark: '#1d4ed8',
      background: '#ffffff',
      card: '#f8fafc',
      surface: '#ffffff', // Pure white for surfaces
      backgroundSecondary: '#f9fbfc', // Very light gray-white background
      textPrimary: '#1e293b', // Primary text color
      textSecondary: '#4b5563', // Slightly darker secondary text
      textTertiary: '#6b7280', // Even lighter tertiary text
      border: '#d1d5db', // Softer border gray
      divider: '#e5e7eb', // Very light divider gray
      accent: '#06b6d4', // Teal accent color
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
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
    colors: {
      // Primary Blues - Darker for Dark Theme
      primary: '#60a5fa',        // Main primary blue - lighter in dark theme
      primaryLight: '#93c5fd',   // Lighter primary blue
      primaryDark: '#3b82f6',    // Darker primary blue - original primary

      // Dark Grays & Near-Blacks
      surface: '#374151',         // Dark gray surface for cards, modals
      background: '#1f2937',      // Near-black background
      backgroundSecondary: '#374151', // Slightly lighter background for sections
      divider: '#4b5563',        // Darker gray divider
      border: '#6b7280',         // Medium dark gray border
      outline: '#9ca3af',        // Gray for outlines, subtle borders - same as light mode

      // Text Colors - Light Grayscale
      textPrimary: '#f9fafb',      // Lightest text for headings, primary content - near white
      textSecondary: '#d1d5db',    // Medium light text
      textTertiary: '#9ca3af',     // Light text - same as light mode textDisabled
      textDisabled: '#6b7280',     // Even darker - original light mode textTertiary

      // Accent Color - Teal (Consistent with Light)
      accent: '#2dd4cf',         // Slightly brighter teal accent for dark mode

      // Semantic Colors (Consistent)
      success: '#34d399',        // Lighter green for dark mode
      warning: '#fcd34d',        // Lighter amber for dark mode
      error: '#f87171',          // Lighter red for dark mode
      info: '#60a5fa',           // Blue for informational messages (can reuse primary)
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)', // Increased shadow intensity for dark mode
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
    },
    radii: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
  };
  