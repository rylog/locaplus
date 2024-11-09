import { ReactNode } from 'react';

import { NavBar } from '../../components/NavBar/NavBar';
import { NavItem } from '../../types/NavItem';

interface MainLayoutProps {
  navItems: NavItem[];
  children: ReactNode;
}

export const MainLayout = ({ navItems, children }: MainLayoutProps) => {
  return (
    <div className="h-full">
      <NavBar navItems={navItems} />
      <main className="h-full">{children}</main>
    </div>
  );
};
