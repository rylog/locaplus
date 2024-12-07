import { createBrowserRouter, Navigate, useParams } from 'react-router';

import { LocaleProvider } from './context/LocaleContext';
import { MainLayout } from './layouts/MainLayout/MainLayout';

// List of supported locales
const SUPPORTED_LOCALES = ['en', 'fr'];

const LocaleValidator = () => {
  const { locale } = useParams();

  if (!SUPPORTED_LOCALES.includes(locale!)) {
    return <Navigate to="/fr" replace />;
  }

  return <LocaleProvider />;
};

const router = createBrowserRouter([
  {
    path: '/:locale',
    element: <LocaleValidator />,
    children: [
      {
        index: true,
        element: <MainLayout />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/fr" replace />,
  },

  //Temp routes to support from old webpage
  {
    path: '/index.php/fr/*',
    element: <Navigate to="/fr" replace />,
  },
  {
    path: '/index.php/en/*',
    element: <Navigate to="/en" replace />,
  },
]);

export default router;
