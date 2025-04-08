import React from 'react';
import { useAppContext } from '../context/AppContext';
import styled from 'styled-components';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import Header from '../components/Header';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SettingsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const SettingsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0;
  margin-bottom: 1rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Option = styled.option`
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.background};
  color: ${({ theme }) => theme.isDarkMode ? theme.colors.textPrimary : theme.colors.textPrimary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;



const Settings = ({ toggleTheme, theme }) => {
  const { currency, setCurrency, distanceUnit, setDistanceUnit } = useAppContext();
    const handleChangeTheme = (e) => {
    toggleTheme(e.target.value);
  };

  return (
    <>
      <Header />
      <SettingsContainer>
        <SettingsHeader>
          <SettingsIcon width={32} height={32} fill="#2563eb" />
          <SettingsTitle>Settings</SettingsTitle>
        </SettingsHeader>

        <SettingsSection>
          <SectionTitle>Appearance</SectionTitle>
          <SettingItem>
            <SettingLabel>Theme</SettingLabel>
            <Select
              id="theme-select"
              name="theme"
              value={theme}
              onChange={handleChangeTheme}
            >
              <Option selected={theme === 'light'} value="light">Light Mode</Option>
              <Option selected={theme === 'dark'} value="dark">Dark Mode</Option>
            </Select>
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
            </Select>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Account</SectionTitle>
          <SettingItem>
            <SettingLabel>Email Notifications</SettingLabel>
            <input type="checkbox" defaultChecked />
          </SettingItem>
        </SettingsSection>
      </SettingsContainer>
    </>
  );
};

export default Settings;
