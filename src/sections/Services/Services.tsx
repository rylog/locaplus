import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import tentsData from '../../data/tents.json';

console.log(tentsData);
const categories = [
  {
    name: 'Tents',
    items: [
      {
        title: "10' x 10' Tent",
        description: 'Capacity: 8 - 10 people',
      },
      {
        title: "10' x 20' Tent",
        description: 'Capacity: 16 - 20 people',
      },
      {
        title: "20' x 20' Tent",
        description: 'Capacity: 32 - 40 people',
      },
      {
        title: "20' x 30' Tent",
        description: 'Capacity: 48 - 60 people',
      },
      {
        title: "20' x 40' Tent",
        description: 'Capacity: 64 - 80 people',
      },
      {
        title: "40' x 40' Tent",
        description: 'Capacity: 128 - 160 people',
      },
      {
        title: 'Hexagonal Tent',
        description: 'Capacity: 84 - 104 people',
      },
      {
        title: "40' x 60' Tent",
        description: 'Capacity: 192 - 240 people',
      },
      {
        title: "40' x 80' Tent",
        description: 'Capacity: 256 - 320 people',
      },
      {
        title: "40' x 100' Tent",
        description: 'Capacity: 320 - 400 people',
      },
      {
        title: "40' x up to 200' Tent",
        description: 'Capacity: up to 800 people',
      },
      {
        title: "60' x 80' Tent",
        description: 'Capacity: 384 - 480 people',
      },
      {
        title: "60' x 100' Tent",
        description: 'Capacity: 480 - 600 people',
      },
      {
        title: "60' x up to 200' Tent",
        description: 'Capacity: up to 1200 people',
      },
    ],
  },
  // Add other categories here...
];

export const Services = () => {
  return (
    <section
      id="Services"
      className="flex flex-grow h-full  bg-black px-6 py-8 sm:py-28 lg:px-8"
    >
      <div className="flex flex-grow mx-auto max-w-2xl">
        <TabGroup className="flex flex-grow flex-col">
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-xl py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3 overflow-auto">
            {categories.map(({ name, items }) => (
              <TabPanel key={name} className="flex rounded-xl bg-white/5 p-3">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="rounded-md p-3 text-sm/6 transition hover:bg-white/5"
                    >
                      <a href="#" className="font-semibold text-white">
                        <span className="absolute inset-0" />
                        {item.title}
                      </a>
                      <p className="text-white/60">{item.description}</p>
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
