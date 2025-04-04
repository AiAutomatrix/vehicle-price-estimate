import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const ImageAnalysis = lazy(() => import('./pages/ImageAnalysis'));
const ValuationResults = lazy(() => import('./pages/ValuationResults'));
const History = lazy(() => import('./pages/History'));
const Settings = lazy(() => import('./pages/Settings'));

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/analyze',
    component: ImageAnalysis,
  },
  {
    path: '/results',
    component: ValuationResults,
  },
  {
    path: '/history',
    component: History,
  },
  {
    path: '/settings',
    component: Settings,
  },
];
