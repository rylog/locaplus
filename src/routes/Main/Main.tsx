'use client';

import { useTranslations } from 'next-intl';

import { NavBar } from '@/components/NavBar/NavBar';
import { Tent } from '@/payload-types';

import { About } from './sections/About/About';
import { Contact } from './sections/Contact/Contact';
import { Home } from './sections/Home/Home';
import { Products } from './sections/Products/Products';

interface MainProps {
  tents: Tent[];
}

export const Main = ({ tents }: MainProps) => {
  const t = useTranslations('HomePage');
  return (
    <>
      <meta name="description" content={t('main.metadata.description')} />

      <div className="max-h-full h-full">
        <Home />
        <NavBar />
      </div>
      <div className="flex flex-col bg-gray-50">
        <About />
        <Products tents={tents ?? []} />
        <Contact />
      </div>
    </>
  );
};
