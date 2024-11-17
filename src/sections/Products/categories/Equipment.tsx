import { useIntl } from 'react-intl';

import equipmentData from '../../../data/equipment.json';

export const Equipment = () => {
  const intl = useIntl();
  const items = [...equipmentData.equipment.list].map((e) => {
    return {
      title: intl.formatMessage({ id: e }),
    };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 w-full rounded-md shadow-md bg-white p-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex sm:p-4 text-sm sm:text-base items-center overflow-hidden"
        >
          {item.title}
        </li>
      ))}
    </div>
  );
};
