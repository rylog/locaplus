import { useIntl } from 'react-intl';

import { SECTIONS } from '../../constants/sections';
import { About } from '../../sections/About/About';
import { Contact } from '../../sections/Contact/Contact';
import { Home } from '../../sections/Home/Home';
import { Products } from '../../sections/Products/Products';
import { NavBar } from '../NavBar/NavBar';
import { SideElement } from '../SideElement/SideElement';

export const MainLayout = () => {
  const intl = useIntl();
  const navItems = [
    {
      name: intl.formatMessage({ id: 'nav.aboutUs' }),
      href: `#${SECTIONS.ABOUT}`,
    },
    {
      name: intl.formatMessage({ id: 'nav.products' }),
      href: `#${SECTIONS.PRODUCTS}`,
    },
    {
      name: intl.formatMessage({ id: 'nav.contactUs' }),
      href: `#${SECTIONS.CONTACT}`,
    },
  ];

  return (
    <>
      <meta
        name="description"
        content={intl.formatMessage({ id: 'main.metadata.description' })}
      />

      <div className="max-h-full h-full">
        <Home />
        <NavBar navItems={navItems} />
      </div>
      <About />
      <Products />
      <Contact />
      <SideElement />
    </>
  );
};
