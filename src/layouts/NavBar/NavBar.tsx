"use client"

import { useState } from 'react';

import Logo from '../../../public/Logo_locaplus.png';

import { NavItem } from '../../types/NavItem';
import { LanguageSelector } from './LanguageSelector';
import { MobileNav } from './MobileNav';
import Image from 'next/image';

interface NavBarProps {
  navItems: NavItem[];
}

export const NavBar = ({ navItems }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-3 lg:px-8 "
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5" aria-label="Go to the home page">
            <Image width={191} height={100} alt="Locaplus Logo" src={Logo.src} className="h-14 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden"></div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base leading-6 text-slate-300 hover:text-slate-200"
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
