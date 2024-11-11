import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { Header } from '../../components/Header/Header';
import chairsAndTablesData from '../../data/chairsAndTables.json';
import equipmentData from '../../data/equipment.json';
import tentsData from '../../data/tents.json';

export const Products = () => {
  const intl = useIntl();

  const tentItems = [...tentsData.tents.list].map((tent) => {
    return {
      img: tent.img,
      title: intl.formatMessage({ id: tent.key }),
      description: intl.formatMessage(
        {
          id: tent.min ? 'tents.capacity.range' : 'tents.capacity.maxOnly',
        },
        { min: tent.min, max: tent.max },
      ),
    };
  });

  const chairsAndTableItems = [...chairsAndTablesData.chairsAndTables.list].map(
    (c) => {
      return {
        img: undefined,
        title: intl.formatMessage({ id: c }),
        description: undefined,
      };
    },
  );

  const equipmentItems = [...equipmentData.equipment.list].map((e) => {
    return {
      img: undefined,
      title: intl.formatMessage({ id: e }),
      description: undefined,
    };
  });

  const categories = [
    {
      name: 'Tents',
      items: tentItems,
    },
    {
      name: 'Chairs & Tables',
      items: chairsAndTableItems,
    },
    {
      name: 'Equipment',
      items: equipmentItems,
    },
  ];

  return (
    <section
      id="products"
      className="flex h-full bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-8 sm:py-28 lg:px-8 snap-always snap-start"
    >
      <div className="flex flex-col overflow-hidden mx-auto max-w-2xl w-full">
        <div className="text-center mb-10">
          <Header color="text-slate-800" type="secondary">
            Our Products
          </Header>
          <p className="text-slate-600 mt-4 text-lg">
            We offer a wide range of high-quality equipment for all your event
            needs, including tents, tables, chairs, and essential accessories.
          </p>
        </div>
        <TabGroup className={'flex flex-grow flex-col overflow-hidden h-full'}>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={clsx(
                  'rounded-xl py-1 px-3 text-sm/6 font-semibold text-slate-900 focus:outline-none',
                  'data-[selected]:bg-indigo-700 data-[selected]:text-white',
                  'data-[hover]:bg-slate-100 data-[selected]:data-[hover]:bg-indigo-700',
                )}
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="flex-grow mt-3 overflow-auto">
            {categories.map(({ name, items }) => (
              <TabPanel key={name} className="flex rounded-xl bg-white p-3">
                <ul className="grid grid-cols-2 sm:grid-cols-2 gap w-full">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex rounded-md p-3 text-sm/6 transition hover:bg-slate-100"
                    >
                      {item.img && (
                        <img
                          alt={item.img}
                          className="size-16 mr-4 hidden sm:flex"
                          src={item.img}
                        />
                      )}
                      <div className="flex flex-col justify-center">
                        <a className="font-medium text-slate-900">
                          {item.title}
                        </a>
                        {item.description && (
                          <p className="text-slate-600">{item.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </section>
  );
};
