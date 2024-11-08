import { useState } from 'react';
import { NavigationItem } from '../models/Navigation';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import Logo from '/Logo_locaplus.png';

interface NavigationBarProps {
  navigationItems: NavigationItem[];
}

export const NavigationBar = ({ navigationItems }: NavigationBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Global"
      className="flex items-center justify-between p-6 lg:px-8"
    >
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <img alt="" src={Logo} className="h-14 w-auto" />
        </a>
      </div>
      <div className="flex lg:hidden"></div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigationItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-base font-semibold leading-6 text-gray-900 hover:underline"
          >
            {item.name}
          </a>
        ))}
      </div>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigationItems}
      />
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <LanguageSelector />
      </div>
    </nav>
  );
};
