import { MainLayout } from './layouts/MainLayout/MainLayout';
import { Home } from './sections/Home/Home';

export const App = () => {
  return (
    <div className="bg-white h-full">
      <MainLayout>
        <Home />
      </MainLayout>
    </div>
  );
};
