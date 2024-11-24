import { useIntl } from 'react-intl';

import { MainLayout } from './layouts/MainLayout/MainLayout';
import { About } from './sections/About/About';
import { Contact } from './sections/Contact/Contact';
import { Home } from './sections/Home/Home';
import { Products } from './sections/Products/Products';

export const App = () => {
  const intl = useIntl();
  const navItems = [
    { name: intl.formatMessage({ id: 'nav.products' }), href: '#products' },
    { name: intl.formatMessage({ id: 'nav.projects' }), href: '#projects' },
  ];

  return (
    <MainLayout navItems={navItems}>
      <Home />
      <About />
      <Products />
      <Contact />
    </MainLayout>
  );
};
