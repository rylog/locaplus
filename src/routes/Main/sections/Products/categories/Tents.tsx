import { useTranslations } from 'next-intl';

import { tentsData } from '@/data/tents';

export const Tents = () => {
  const t = useTranslations();
  const items = tentsData.map((tent) => {
    const { img, key, max, spaceRequired } = tent;
    const min = 'min' in tent ? tent.min : undefined;
    return {
      img,
      title: t(key),
      description:
        min !== undefined
          ? t('HomePage.tents.capacity.range', { min, max })
          : t('HomePage.tents.capacity.maxOnly', { max }),
      spaceRequired: t(spaceRequired),
    };
  });

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-50 rounded-md sm:bg-transparent w-full p-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex flex-row rounded-md p-4 bg-white shadow-md text-sm sm:text-base transition"
        >
          <picture>
            <img
              alt={item.img}
              className="w-20 h-20 object-contain rounded-md"
              src={item.img}
            />
          </picture>

          <div className="flex flex-col grow self-center">
            <p className="font-medium text-slate-900">{item.title}</p>
            <p className="text-gray-500">{item.description}</p>
            <p className="text-gray-500">{item.spaceRequired}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
