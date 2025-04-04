import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import * as GlobalStyles from './styles/GlobalStyles';
import { useState } from 'react';

import Home from './pages/Home';
import ImageAnalysis from './pages/ImageAnalysis';
import ValuationResults from './pages/ValuationResults';
import History from './pages/History';
import Settings from './pages/Settings';

function App() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/analyze",
        element: <ImageAnalysis />,
      },
      {
        path: "/results",
        element: <ValuationResults />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/settings",
        element: <Settings toggleTheme={toggleTheme} theme={theme} />,
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles.default />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
