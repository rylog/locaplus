import { BrowserRouter, Route, Routes } from 'react-router';

import { LocaleProvider } from './context/LocaleContext';
import { MainLayout } from './layouts/MainLayout/MainLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <Routes>
          <Route path="/en" element={<MainLayout />} />
          <Route path="/fr" element={<MainLayout />} />
        </Routes>
      </LocaleProvider>
    </BrowserRouter>
  );
};
