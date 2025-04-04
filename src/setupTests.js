import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Custom render that includes theme provider
const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    ),
    ...options
  });

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { customRender as render };
