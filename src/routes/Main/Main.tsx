'use client';

import { useTranslations } from 'next-intl';

import { NavBar } from '../../components/NavBar/NavBar';
import { SECTIONS } from '../../constants/sections';
import { About } from './sections/About/About';
import { Contact } from './sections/Contact/Contact';
import { Home } from './sections/Home/Home';
import { Products } from './sections/Products/Products';

export const Main = () => {
  const t = useTranslations('HomePage');
  const navItems = [
    {
      name: t('nav.aboutUs'),
      href: `#${SECTIONS.ABOUT}`,
    },
    {
      name: t('nav.products'),
      href: `#${SECTIONS.PRODUCTS}`,
    },
    {
      name: t('nav.contactUs'),
      href: `#${SECTIONS.CONTACT}`,
    },
  ];

  return (
    <>
      <meta name="description" content={t('main.metadata.description')} />

      <div className="max-h-full h-full">
        <Home />
        <NavBar navItems={navItems} />
      </div>
      <About />
      <Products />
      <Contact />
    </>
  );
};
