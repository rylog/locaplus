import { ReactNode } from 'react';

import { NavBar } from '../NavBar/NavBar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigation = [
    { name: 'Tents', href: '#' },
    { name: 'Photos', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];

  return (
    <div className="bg-white h-full">
      <NavBar navItems={navigation} />
      <main>{children}</main>
    </div>
  );
};
