import { ReactNode } from 'react';

import { NavItem } from '../../types/NavItem';
import { NavBar } from '../NavBar/NavBar';

interface MainLayoutProps {
  navItems: NavItem[];
  children: ReactNode;
}

export const MainLayout = ({ navItems, children }: MainLayoutProps) => {
  return (
    <div className="h-full">
      <NavBar navItems={navItems} />
      <div></div>
      {children}
    </div>
  );
};
