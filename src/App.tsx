import { BrowserRouter, Route, Routes } from 'react-router';
import { Navigate } from 'react-router';

import { LocaleProvider } from './context/LocaleContext';
import { MainLayout } from './layouts/MainLayout/MainLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <Routes>
          <Route path="/index.php/en/*" element={<Navigate to="/" replace />} />
          <Route path="/index.php/fr/*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </LocaleProvider>
    </BrowserRouter>
  );
};
