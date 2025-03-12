import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { SECTIONS } from '../../../../constants/sections';
import { Equipment } from './categories/Equipment';
import { FlooringChairsAndTables } from './categories/FlooringChairsAndTables';
import { Tents } from './categories/Tents';

export const Products = () => {
  const t = useTranslations('HomePage');
  const categories = [
    {
      name: t('products.tents'),
      component: Tents,
    },
    {
      name: t('products.equipment'),
      component: Equipment,
    },
    {
      name: t('products.flooringChairsAndTables'),
      component: FlooringChairsAndTables,
    },
  ];

  return (
    <section id={SECTIONS.PRODUCTS}>
      <div className="flex flex-col overflow-hidden mx-auto max-w-6xl w-full gap-8 px-0 pt-12 lg:px-8">
        <header className="text-center max-w-2xl self-center">
          <h1 className="text-lg/7 font-semibold text-primary">
            {t('nav.products')}
          </h1>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            {t('products.title')}
          </h2>
          <p className="mt-2 text-gray-600">{t('products.description')}</p>
        </header>
        <TabGroup className="flex grow flex-col overflow-hidden">
          <TabList className="flex gap-2 px-2">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={clsx(
                  'rounded-md py-1 px-3 text-sm/6  font-semibold text-slate-900 focus:outline-hidden',
                  'data-selected:bg-primary data-selected:text-white',
                  'data-hover:bg-slate-100 data-selected:data-hover:bg-primary',
                )}
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="grow mt-3 overflow-auto">
            {categories.map(({ name, component: Component }) => {
              return (
                <TabPanel key={name} className="flex p-1">
                  <Component />
                </TabPanel>
              );
            })}
          </TabPanels>
        </TabGroup>
      </div>
    </section>
  );
};
