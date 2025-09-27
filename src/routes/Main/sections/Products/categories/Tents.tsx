import { useTranslations } from 'next-intl';

import { tentsData } from '@/data/tents';

export const Tents = () => {
  const t = useTranslations('HomePage');
  const items = tentsData.map((tent) => {
    const { img, key, max } = tent;
    const min = 'min' in tent ? tent.min : undefined;
    return {
      img,
      title: t(key),
      description:
        min !== undefined
          ? t('tents.capacity.range', { min, max })
          : t('tents.capacity.maxOnly', { max }),
    };
  });

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-md sm:bg-transparent w-full">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex flex-row rounded-md p-4 bg-white shadow-md text-sm sm:text-base transition hover:bg-slate-100  gap-4"
        >
          <picture>
            <img
              alt={item.img}
              className="w-20 h-20 object-cover rounded-md"
              src={item.img}
            />
          </picture>

          <div className="flex flex-col grow self-center">
            <p className="font-medium text-slate-900">{item.title}</p>
            <p className="text-gray-500">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
