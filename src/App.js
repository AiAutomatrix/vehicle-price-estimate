import React, { useCallback, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AppProvider, useAppContext } from './context/AppContext';

import Settings from './pages/Settings';
import SavedReports from './pages/SavedReports';
import CreateAd from './pages/CreateAd';
import CommonProblems from './pages/CommonProblems';
import VehicleReviews from './pages/VehicleReviews';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/ErrorBoundary';
const Home = lazy(() => import('./pages/Home'));
const Loading = lazy(() => import('./pages/Loading'));
const Loading2 = lazy(() => import('./pages/Loading2'));
const ImageAnalysis = lazy(() => import('./pages/ImageAnalysis'));
const VehicleForm = lazy(() => import('./pages/VehicleForm'));
const ValuationResults = lazy(() => import('./pages/ValuationResults'));
const History = lazy(() => import('./pages/History'));

const ManualEntryWithContext = () => {
    const { setVehicleData } = useAppContext();
    const navigate = useNavigate();
    const handleSubmit = useCallback((formData) => {
      setVehicleData(formData);
      navigate('/results', { state: { vehicleDetails: formData } });
    }, [setVehicleData, navigate]);
    return <VehicleForm onSubmit={handleSubmit} />;
  };
// Define routes configuration
const routes =  [
    { path: '/', element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
    {
        path: '/analyze',
        element: (
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}><ImageAnalysis /></Suspense>
            </ErrorBoundary>
        ),
    },
    { path: "/manual-entry", element: <Suspense fallback={<div>Loading...</div>}><ManualEntryWithContext /></Suspense> },
    { path: '/loading', element: <Suspense fallback={<div>Loading...</div>}><Loading /></Suspense> },
    { path: '/loading2', element: <Suspense fallback={<div>Loading...</div>}><Loading2 /></Suspense> },
    { path: '/results', element: <Suspense fallback={<div>Loading...</div>}><ValuationResults /></Suspense> },
    { path: '/history', element: <Suspense fallback={<div>Loading...</div>}><History /></Suspense> },
    { path: '/settings', element: <Suspense fallback={<div>Loading...</div>}><Settings /></Suspense> },
    { path: "/saved-reports", element: <Suspense fallback={<div>Loading...</div>}><SavedReports /></Suspense> },
    { path: "/create-ad", element: <Suspense fallback={<div>Loading...</div>}><CreateAd /></Suspense> },
    { path: "/common-problems", element: <Suspense fallback={<div>Loading...</div>}><CommonProblems /></Suspense> },
    { path: "/vehicle-reviews", element: <Suspense fallback={<div>Loading...</div>}><VehicleReviews /></Suspense> },


];

// Create a component that consumes the context and provides the theme
function ThemedAppContent() {
  const { themeMode } = useAppContext(); // Get themeMode from context
  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  console.log('ThemedAppContent rendering with themeMode:', themeMode); // Log theme mode

  return (
    <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <RouterProvider
        router={createBrowserRouter(routes)}
        future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,

        }}
      />


    </ThemeProvider>
  );
}

// Main App component wraps everything with the AppProvider
function App({ children }) {
  useAppContext();
  console.log('App component rendering'); // Log when the App component renders
  
  


  return (
    <AppProvider>
      <ThemedAppContent />
    </AppProvider>
  );
}

export default App;
