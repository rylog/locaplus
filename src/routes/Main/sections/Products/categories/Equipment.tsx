import { useTranslations } from 'next-intl';

import { equipmentData } from '@/data/equipment';

export const Equipment = () => {
  const t = useTranslations('HomePage');
  const items = equipmentData.map((e) => {
    return {
      title: t(e),
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
