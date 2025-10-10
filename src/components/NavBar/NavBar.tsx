'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import Logo from '@/../public/Logo_locaplus.png';
import { SECTIONS } from '@/constants/sections';
import { Link, usePathname } from '@/i18n/routing';

import { LanguageSelector } from './LanguageSelector';
import { MobileNav } from './MobileNav';

export const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = useTranslations('HomePage');
  const locale = useLocale();

  const pathname = usePathname();

  const temposNavItems = [
    {
      name: t('nav.home'),
      href: `/${locale}/`,
    },
    {
      name: t('nav.whyChooseUs'),
      href: `/${locale}/${SECTIONS[locale].TEMPOS}#${SECTIONS[locale].WHY_CHOOSE_US}`,
    },
    {
      name: t('nav.popularShelters'),
      href: `/${locale}/${SECTIONS[locale].TEMPOS}#${SECTIONS[locale].POPULAR_SHELTERS}`,
    },
    {
      name: t('nav.FAQ'),
      href: `/${locale}/${SECTIONS[locale].TEMPOS}#${SECTIONS[locale].FAQ}`,
    },
    {
      name: t('nav.requestAQuote'),
      href: `/${locale}/${SECTIONS[locale].TEMPOS}#${SECTIONS[locale].QUOTE}`,
    },
  ];

  const rootNavItems = [
    {
      name: t('nav.tempos'),
      href: `/${locale}/${SECTIONS[locale].TEMPOS}`,
    },
    {
      name: t('nav.careers'),
      href: `/${locale}/${SECTIONS[locale].CAREERS}`,
    },
    {
      name: t('nav.products'),
      href: `/${locale}#${SECTIONS[locale].PRODUCTS}`,
    },
    {
      name: t('nav.aboutUs'),
      href: `/${locale}#${SECTIONS[locale].ABOUT}`,
    },
    {
      name: t('nav.contactUs'),
      href: `/${locale}#${SECTIONS[locale].CONTACT}`,
    },
  ];

  const navItems = pathname.includes('/tempo') ? temposNavItems : rootNavItems;

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-3 lg:px-8 "
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5"
            aria-label="Go to the home page"
          >
            <Image
              width={191}
              height={100}
              alt="Locaplus Logo"
              src={Logo.src}
              className="h-14 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden"></div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base leading-6 text-slate-300 hover:text-slate-200 cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <MobileNav
          mobileNavOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navItems={navItems}
        />
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
};
