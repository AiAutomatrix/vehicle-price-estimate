import React from 'react';
import { AppProvider } from './context/AppContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';
import Loading from './pages/Loading';
import Loading2 from './pages/Loading2';
import ImageAnalysis from './pages/ImageAnalysis';
import VehicleForm from './pages/VehicleForm';
import ValuationResults from './pages/ValuationResults';
import History from './pages/History';
import Settings from './pages/Settings';
import SavedReports from './pages/SavedReports';
import CreateAd from './pages/CreateAd';
import CommonProblems from './pages/CommonProblems';
import VehicleReviews from './pages/VehicleReviews';

function App() {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = (selectedTheme) => {
    console.log('toggleTheme called with theme:', selectedTheme);
    console.log('Current theme state (before setTheme):', theme); // Log before setTheme
    localStorage.setItem('theme', selectedTheme);
    setTheme(selectedTheme);
    console.log('Current theme state (after setTheme):', theme); // Log after setTheme
  };

  console.log('App component rendering with theme:', theme); // Log in render

  console.log('Initial theme:', theme);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/analyze",
        element: (
          <ErrorBoundary>
            <ImageAnalysis />
          </ErrorBoundary>
        ),
      },
      {
        path: "/manual-entry",
        element: <VehicleForm />,
      },
      {
        path: "/loading",
        element: <Loading />,
      },
      {
        path: "/loading2",
        element: <Loading2 />,
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
     {
       path: "/saved-reports",
       element: <SavedReports />,
     },
     {
      path: "/create-ad",
      element: <CreateAd />,
    },
    {
      path: "/common-problems",
      element: <CommonProblems />,
    },
    {
      path: "/vehicle-reviews",
      element: <VehicleReviews />,
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
      <GlobalStyles />
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
