import { useIntl } from 'react-intl';

import tentsData from '../../../data/tents.json';

export const Tents = () => {
  const intl = useIntl();
  const items = [...tentsData.tents.list].map((tent) => {
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

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-md sm:bg-transparent w-full">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex flex-row rounded-md p-4 bg-white shadow-md text-sm sm:text-base transition hover:bg-slate-100  gap-4"
        >
          <img
            alt={item.img}
            className="w-20 h-20 object-cover rounded-md"
            src={item.img}
          />

          <div className="flex flex-col grow self-center">
            <p className="font-medium text-slate-900">{item.title}</p>
            <p className="text-gray-500">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
