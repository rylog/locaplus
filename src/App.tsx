import { Home } from './components/Home/Home';
import { NavigationBar } from './components/NavigationBar';

const navigation = [
  { name: 'Tents', href: '#' },
  { name: 'Photos', href: '#' },
  { name: 'Contact Us', href: '#' },
];

export const App = () => {
  return (
    <div className="bg-white">
      <NavigationBar navigationItems={navigation} />
      <Home />
    </div>
  );
};
