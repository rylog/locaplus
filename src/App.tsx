import { useIntl } from 'react-intl';

import { MainLayout } from './layouts/MainLayout/MainLayout';
import { Contact } from './sections/Contact/Contact';
import { Home } from './sections/Home/Home';

export const App = () => {
  const intl = useIntl();
  const navItems = [
    { name: intl.formatMessage({ id: 'navTents' }), href: '#' },
    { name: intl.formatMessage({ id: 'navPhotos' }), href: '#' },
    { name: intl.formatMessage({ id: 'navContactUs' }), href: '#Contact' },
  ];

  return (
    <div className="h-full">
      <MainLayout navItems={navItems}>
        <Home />
        <Contact />
      </MainLayout>
    </div>
  );
};
