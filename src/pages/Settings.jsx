import React from 'react';import Header from '../components/Header';
import { lightTheme, darkTheme } from '../styles/theme';
import { useAppContext } from '../context/AppContext';
import styled from 'styled-components';


// Define themes BEFORE using them

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background}; /* Use theme */
  color: ${({ theme }) => theme.colors.textPrimary}; /* Use theme */
  min-height: calc(100vh - 60px); /* Adjust based on header height */
`;

const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  /* Example: Adjust icon color based on theme */
  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const SettingsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary}; /* Use theme */
  margin: 0;
`;

const SettingsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md}; /* Add shadow */
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary}; /* Use theme */
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider}; /* Use theme */
  padding-bottom: 0.5rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider}; /* Use theme */

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary}; /* Use secondary for labels */
  margin: 0;
`;

const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md}; /* Slightly larger radius */
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface}; /* Use surface */
  color: ${({ theme }) => theme.colors.textPrimary}; /* Use theme */
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight}40; /* Focus ring */
  }
`;

// Removed unused Option styled component - standard <option> is fine

// --- Settings Component ---
// Removed theme and toggleTheme from props
const Settings = () => {

  // Get theme state and functions from context
  const {
    currency,
    setCurrency,
    distanceUnit,
    setDistanceUnit,
    themeMode, // Get themeMode from context
    toggleTheme, // Get toggleTheme from context
  } = useAppContext();

  // No need for a separate handleChangeTheme handler anymore

  return (
    <>
      <Header />
      <SettingsContainer>
        <SettingsHeader>
          {/* Replace with actual icon usage if needed */}
          {/* <SettingsIcon width={32} height={32} /> */}
          <span style={{ fontSize: '2rem' }}>⚙️</span> {/* Placeholder Icon */}
          <SettingsTitle>Settings</SettingsTitle>
        </SettingsHeader>
  
        <SettingsSection>
          <SectionTitle>Appearance</SectionTitle>
          <SettingItem>
            <SettingLabel>Theme</SettingLabel>
            {/* Simplified Theme Toggle - using a button for clarity */}
            <button
              onClick={toggleTheme} // Call toggleTheme directly
              style={{
                padding: '0.6rem 1rem',
                cursor: 'pointer',
                borderRadius: '8px', // theme.radii.md
                border: `1px solid ${themeMode === 'light' ? lightTheme.colors.border : darkTheme.colors.border}`,
                backgroundColor: themeMode === 'light' ? lightTheme.colors.surface : darkTheme.colors.surface,
                color: themeMode === 'light' ? lightTheme.colors.textPrimary : darkTheme.colors.textPrimary,
             }}
            >
              Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Mode
            </button>
             {/* Kept the select as an alternative - choose one */}
             {/*
             <Select
               id="theme-select"
               name="theme"
               value={themeMode} // Use themeMode from context
               onChange={toggleTheme} // Call toggleTheme directly
             >
               <option value="light">Light Mode</option>
               <option value="dark">Dark Mode</option>
             </Select>
             */}
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Units</SectionTitle>
          <SettingItem>
            <SettingLabel>Distance</SettingLabel>
            <Select
              value={distanceUnit}
              onChange={(e) => setDistanceUnit(e.target.value)}
            >
              <option value="miles">Miles</option>
              <option value="kilometers">Kilometers</option>
            </Select>
          </SettingItem>
          <SettingItem>
            <SettingLabel>Currency</SettingLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
              {/* Add more currencies if needed */}
            </Select>
          </SettingItem>
        </SettingsSection>

        {/* Removed Account Section for brevity, can be added back */}
        {/*
        <SettingsSection>
          <SectionTitle>Account</SectionTitle>
          <SettingItem>
            <SettingLabel>Email Notifications</SettingLabel>
            <input type="checkbox" defaultChecked /> // Consider making this stateful
          </SettingItem>
        </Section>
        */}
      </SettingsContainer>
    </>
  );
};
  
  
export default Settings;
