import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { Header } from '../../components/Header/Header';
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
      id="products"
      className="flex  bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-8 sm:py-12 lg:px-8 min-h-full"
    >
      <div className="flex flex-col overflow-hidden mx-auto max-w-6xl w-full">
        <Header
          color="text-slate-black mb-5 sm:flex text-center"
          type="secondary"
        >
          <FormattedMessage id="nav.products" />
        </Header>
        <TabGroup className="flex flex-grow flex-col overflow-hidden min-h-full">
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
