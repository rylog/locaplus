import { useIntl } from 'react-intl';

import { MainLayout } from './layouts/MainLayout/MainLayout';
import { Contact } from './sections/Contact/Contact';
import { Home } from './sections/Home/Home';
import { Services } from './sections/Services/Services';

export const App = () => {
  const intl = useIntl();
  const navItems = [
    { name: intl.formatMessage({ id: 'nav.services' }), href: '#' },
    { name: intl.formatMessage({ id: 'nav.photos' }), href: '#' },
  ];

  return (
    <div className="h-full">
      <MainLayout navItems={navItems}>
        <Home />
        <Services />
        <Contact />
      </MainLayout>
    </div>
  );
};
