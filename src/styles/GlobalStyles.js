import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Open Sans', sans-serif; /* Default body font */
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  button {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif; /* Heading font */
    font-weight: 700; /* Bold headings */
    line-height: 1.2;
    margin-bottom: 1rem; /* Spacing below headings */
  }

  h1 {
    font-size: 2.5rem; /* ~40px */
  }

  h2 {
    font-size: 2rem;    /* ~32px */
  }

  h3 {
    font-size: 1.75rem; /* ~28px */
  }

  h4 {
    font-size: 1.5rem;  /* ~24px */
  }

  h5 {
    font-size: 1.25rem; /* ~20px */
  }

  h6 {
    font-size: 1rem;    /* ~16px */
    font-weight: 600; /* Semi-bold for lower headings */
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

GlobalStyles.displayName = 'GlobalStyles';

export default GlobalStyles;
