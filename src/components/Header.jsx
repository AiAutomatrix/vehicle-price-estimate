import React from 'react';
import { useAppContext } from '../context/AppContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}; /* Add border bottom */
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
  border-radius: 8px;
  justify-content: center;
  width: 40px;;
  height: 40px;;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
  };
`;

const Header = () => {
  const { setImages } = useAppContext();
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    if (isHistoryOpen) {
      navigate('/'); // Navigate to home if already open
    } else {
      navigate('/history');
    }
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleSettingsClick = () => {
    if (isSettingsOpen) {
      navigate('/'); // Navigate to home if already open
    } else {
      navigate('/settings');
    }
    setIsSettingsOpen(!isSettingsOpen);
  };

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
        <NavIcon onClick={() => navigate('/saved-reports')}>
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
