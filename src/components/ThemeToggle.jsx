import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + span:before {
    transform: translateX(30px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.border};
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const ToggleLabel = styled.label`
  font-size: 14px;
  margin-right: 10px;
`;

const ThemeToggle = ({ toggleTheme, theme }) => {
  return (
    <ToggleContainer>
      <ToggleLabel htmlFor="theme-toggle">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</ToggleLabel>
      <ToggleInput
        type="checkbox"
        id="theme-toggle"
        data-testid="theme-toggle"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <ToggleSlider />
    </ToggleContainer>
  );
};

export default ThemeToggle;
