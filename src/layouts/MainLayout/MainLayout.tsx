import { ReactNode } from 'react';

import { NavItem } from '../../types/NavItem';
import { NavBar } from '../NavBar/NavBar';
import { SideElement } from '../SideElement/SideElement';

interface MainLayoutProps {
  navItems: NavItem[];
  children: ReactNode;
}

export const MainLayout = ({ navItems, children }: MainLayoutProps) => {
  return (
    <div className="max-h-full h-full">
      <NavBar navItems={navItems} />
      {children}
      <SideElement />
    </div>
  );
};
