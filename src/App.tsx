import { MainLayout } from './layouts/MainLayout/MainLayout';
import { Contact } from './sections/Contact/Contact';
import { Home } from './sections/Home/Home';

export const App = () => {
  const navItems = [
    { name: 'Tents', href: '#' },
    { name: 'Photos', href: '#' },
    { name: 'Contact Us', href: '#' },
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
