'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Tent } from '@/payload-types';

import { SECTIONS } from '../../../../constants/sections';

interface ProductsProps {
  tents: Tent[];
}

export const Products = ({ tents }: ProductsProps) => {
  const locale = useLocale();
  const t = useTranslations('HomePage');
  const items = tents.map((tent) => {
    const { image, title, minCapacity, maxCapacity, spaceRequired } = tent;
    const min =
      'minCapacity' in tent &&
      tent.minCapacity !== undefined &&
      tent.minCapacity !== null
        ? tent.minCapacity
        : 0;
    const max =
      maxCapacity !== undefined && maxCapacity !== null ? maxCapacity : 0;
    return {
      image,
      title,
      description:
        minCapacity !== undefined
          ? t('tents.capacity.range', { min, max: max })
          : t('tents.capacity.maxOnly', { max: max }),
      spaceRequired,
    };
  });

  return (
    <section
      id={SECTIONS[locale].PRODUCTS}
      className="bg-gray-50 lg:pt-8 pt-0 lg:pb-28"
    >
      <div className="flex flex-col overflow-hidden mx-auto max-w-6xl w-full lg:gap-8 px-0 pt-12 lg:px-0">
        <header className="max-w-2xl lg:px-0 px-4 md:self-center text-center">
          <h1 className="text-lg/7 font-semibold text-primary">
            {t('nav.products')}
          </h1>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            {t('products.title')}
          </h2>
          <p className="mt-2 text-gray-600">{t('products.description')}</p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-50 rounded-md sm:bg-transparent w-full p-4">
          {items.map((tent, index) => (
            <li
              key={index}
              className="flex flex-row rounded-md p-4 bg-white shadow-md text-sm sm:text-base transition"
            >
              <div className="relative w-20 h-20 mr-4 overflow-hidden">
                <Image
                  fill
                  alt={
                    typeof tent.image === 'object' &&
                    tent.image !== null &&
                    'alt' in tent.image
                      ? tent.image.alt
                      : ''
                  }
                  className="w-20 h-20 object-contain rounded-md"
                  src={
                    typeof tent.image === 'string'
                      ? tent.image
                      : tent.image &&
                          typeof tent.image === 'object' &&
                          'url' in tent.image &&
                          tent.image.url
                        ? tent.image.url
                        : '/placeholder.png'
                  }
                  sizes="80px"
                />
              </div>

              <div className="flex flex-col grow self-center">
                <p className="font-medium text-slate-900">{tent.title}</p>
                <p className="text-gray-500">{tent.description}</p>
                <p className="text-gray-500">{tent.spaceRequired}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="lg:mt-12 bg-gray-50 lg:bg-gray-100 rounded-lg p-10 py-12 lg:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center lg:text-left">
              {t('products.moreProductsTitle')}
            </h3>
            <p className="text-gray-700 text-center lg:text-left">
              {t('products.moreProductsDescription')}
            </p>
          </div>
          <Link
            href={`/catalogue`}
            className="mt-4 sm:mt-0 inline-block bg-slate-800 text-white px-5 py-2 rounded-md font-medium hover:bg-slate-900 transition"
          >
            {t('products.viewFullCatalogue')}
          </Link>
        </div>
      </div>
    </section>
  );
};
