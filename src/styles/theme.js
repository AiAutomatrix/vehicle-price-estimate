// src/styles/theme.js

// --- Light Theme ---
export const lightTheme = {
  isDarkMode: false,
  colors: {
    // Core Palette
    primary: '#5E5CE6', // Vibrant Blue/Purple
    primaryLight: '#7D7AFF',
    primaryDark: '#4A46D4',
    secondary: '#FF9F0A', // Bright Orange
    secondaryLight: '#FFB757',
    secondaryDark: '#E68A00',
    accent: '#34C759', // Vivid Green
    accentLight: '#5EDD7C',
    accentDark: '#2CAF4A',

    // Neutrals & Backgrounds
    background: '#F2F2F7', // Off-white, softer than pure white
    backgroundSecondary: '#FFFFFF', // Pure White for cards/modals
    surface: '#FFFFFF', // Surface color for elements like inputs
    card: '#FFFFFF',
    neutral: '#E5E5EA', // Light Gray for borders, dividers
    neutralLight: '#F2F2F7',
    neutralDark: '#D1D1D6',

    // Text
    textPrimary: '#1C1C1E', // Almost Black for high contrast
    textSecondary: '#636366', // Medium Gray for less emphasis
    textTertiary: '#8E8E93', // Lighter Gray for hints, placeholders
    textOnPrimary: '#FFFFFF', // Text on primary background
    textOnSecondary: '#FFFFFF', // Text on secondary background

    // Status Colors
    border: '#D1D1D6',
    divider: '#E5E5EA',
    success: '#30D158', // Brighter Success Green
    successLight: '#5EEAA0',
    successDark: '#24A148',
    warning: '#FFD60A', // Yellow Warning
    warningLight: '#FFEE57',
    warningDark: '#E6BE00',
    error: '#FF453A', // Red Error
    errorLight: '#FF7B72',
    errorDark: '#D93025',
    info: '#0A84FF', // Blue Info
    infoLight: '#57ABFF',
    infoDark: '#0060D1',

    // Specific Components (Can be expanded)
    headerBackground: '#FFFFFF',
    footerBackground: '#F2F2F7',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px', // Added for potentially larger rounds
    round: '50%', // For circular elements
  },
};

// --- Dark Theme ---
export const darkTheme = {
  isDarkMode: true,
  colors: {
    // Core Palette (Adjusted for Dark Mode)
    primary: '#64D2FF', // Bright Cyan/Blue
    primaryLight: '#8AE0FF',
    primaryDark: '#4BBEE6',
    secondary: '#FFB040', // Lighter Orange
    secondaryLight: '#FFC977',
    secondaryDark: '#E69A2E',
    accent: '#30D158', // Shared Green (often works well on dark)
    accentLight: '#5EEAA0',
    accentDark: '#24A148',

    // Neutrals & Backgrounds
    background: '#000000', // True Black or very dark gray
    backgroundSecondary: '#1C1C1E', // Slightly Lighter Dark Gray for cards
    surface: '#1C1C1E', // Surface color for elements
    card: '#1C1C1E',
    neutral: '#3A3A3C', // Dark Gray for borders, dividers
    neutralLight: '#505052',
    neutralDark: '#2C2C2E',

    // Text
    textPrimary: '#FFFFFF', // Pure White for high contrast
    textSecondary: '#EBEBF599', // Off-white/Light Gray (with opacity example)
    textTertiary: '#EBEBF54D', // Dimmer Gray (with opacity example)
    textOnPrimary: '#000000', // Text on primary background
    textOnSecondary: '#000000', // Text on secondary background

    // Status Colors (Adjusted for Dark Mode)
    border: '#3A3A3C',
    divider: '#2C2C2E',
    success: '#32D74B', // Slightly brighter green for dark bg
    successLight: '#65E782',
    successDark: '#28A745',
    warning: '#FFD60A', // Shared Yellow (often works well)
    warningLight: '#FFEE57',
    warningDark: '#E6BE00',
    error: '#FF453A', // Shared Red (often works well)
    errorLight: '#FF7B72',
    errorDark: '#D93025',
    info: '#0B84FF', // Slightly brighter blue
    infoLight: '#57ABFF',
    infoDark: '#0060D1',

    // Specific Components
    headerBackground: '#1C1C1E',
    footerBackground: '#000000',
  },
  // Shadows often need to be more subtle or use lighter colors in dark mode
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.2)', // Darker shadows
    md: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  // Radii can often be shared between themes
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    round: '50%',
  },
};
