import { BrowserRouter, Route, Routes } from 'react-router';
import { Navigate } from 'react-router';

import { LocaleProvider } from './context/LocaleContext';
import { MainLayout } from './layouts/MainLayout/MainLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <Routes>
          <Route
            path="/frdex.php/en/*"
            element={<Navigate to="/en" replace />}
          />
          <Route
            path="/frdex.php/fr/*"
            element={<Navigate to="/fr" replace />}
          />
          <Route
            path="/index.php/en/*"
            element={<Navigate to="/en" replace />}
          />
          <Route
            path="/index.php/fr/*"
            element={<Navigate to="/fr" replace />}
          />
          <Route path="/" element={<Navigate to="/fr" replace />} />
          <Route path="/fr" element={<MainLayout />} />
          <Route path="/en" element={<MainLayout />} />
        </Routes>
      </LocaleProvider>
    </BrowserRouter>
  );
};
