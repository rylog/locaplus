import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { SECTIONS } from '../../constants/sections';
import { ChairsAndTables } from './categories/ChairsAndTables';
import { Equipment } from './categories/Equipment';
import { Tents } from './categories/Tents';

export const Products = () => {
  const categories = [
    {
      name: 'Tents',
      component: Tents,
    },
    {
      name: 'Equipment',
      component: Equipment,
    },
    {
      name: 'Chairs & Tables',
      component: ChairsAndTables,
    },
  ];

  return (
    <section
      id={SECTIONS.PRODUCTS}
      className="flex bg-slate-50 min-h-full lg:min-h-0 py-24"
    >
      <div className="flex flex-col overflow-hidden mx-auto max-w-6xl w-full gap-8">
        <header className="text-center max-w-2xl self-center">
          <h1 className="text-lg/7 font-semibold text-primary">
            <FormattedMessage id="nav.products" />
          </h1>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            <FormattedMessage id="products.title" />
          </h2>
          <p className="mt-2 text-gray-600">
            <FormattedMessage id="products.description" />
          </p>
        </header>
        <TabGroup className="flex flex-grow flex-col overflow-hidden">
          <TabList className="flex gap-2">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={clsx(
                  'rounded-md py-1 px-3 text-sm/6  font-semibold text-slate-900 focus:outline-none',
                  'data-[selected]:bg-primary data-[selected]:text-white',
                  'data-[hover]:bg-slate-100 data-[selected]:data-[hover]:bg-primary',
                )}
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="flex-grow mt-3 overflow-auto">
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
