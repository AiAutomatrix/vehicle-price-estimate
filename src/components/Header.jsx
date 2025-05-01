import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo-transparent.png';
import { ReactComponent as HistoryIcon } from '../assets/icons/history.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import { ReactComponent as SaveIcon } from '../assets/icons/save.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavItems = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavIcon = styled.div`
  cursor: pointer;
  display: flex;
  border-radius: ${({ theme }) => theme.radii.md};
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Header = () => {
  const { setImages, previousPage, setPreviousPage } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSavedReportsClick = () => {
    if (location.pathname === '/saved-reports') {
      navigate(previousPage);
      setPreviousPage(location.pathname);
    } else {
      setPreviousPage(location.pathname);
      navigate('/saved-reports');
    }
  };

  const handleHistoryClick = () => {
    if (location.pathname === '/history') {
      navigate(previousPage);
      setPreviousPage(location.pathname);
    } else {
      setPreviousPage(location.pathname);
      navigate('/history');
    }
  };

  const handleSettingsClick = () => {
    if (location.pathname === '/settings') {
      navigate(previousPage);
      setPreviousPage(location.pathname);
    } else {
      setPreviousPage(location.pathname);
      navigate('/settings');
    }
  };



  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.3/inject.js';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/04/18/17/20250418174829-PSCQOU8Y.js';
    document.body.appendChild(script2);
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    }
  }, []);
  return (
    <HeaderContainer>
      <LogoContainer onClick={() => {
        setImages([]);
        navigate('/');
      }}>
        <img src={Logo} alt="Vehicle Valuation Logo" width={180} height={80} />
      </LogoContainer>
      <NavItems>
        <NavIcon onClick={handleHistoryClick}>
          <HistoryIcon width={30} height={30} fill="currentColor" />
        </NavIcon>
        <NavIcon onClick={handleSavedReportsClick}>
          <SaveIcon width={30} height={30} fill="currentColor" />
        </NavIcon>
        <NavIcon onClick={handleSettingsClick}>
          <SettingsIcon width={30} height={30} fill="currentColor" />
        </NavIcon>
      </NavItems>
    </HeaderContainer>

  );
};

export default Header;
