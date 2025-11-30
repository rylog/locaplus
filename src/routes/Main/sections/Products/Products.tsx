'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

import { SECTIONS } from '../../../../constants/sections';
import { Tents } from './categories/Tents';

export const Products = () => {
  const locale = useLocale();
  const t = useTranslations('HomePage');

  return (
    <section
      id={SECTIONS[locale].PRODUCTS}
      className="bg-gray-50 lg:pt-8 pt-0 lg:pb-28"
    >
      <div className="flex flex-col overflow-hidden mx-auto max-w-6xl w-full lg:gap-8 px-0 pt-12 lg:px-0">
        <header className="max-w-2xl lg:px-0 px-4 lg:self-center text-center">
          <h1 className="text-lg/7 font-semibold text-primary">
            {t('nav.products')}
          </h1>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            {t('products.title')}
          </h2>
          <p className="mt-2 text-gray-600">{t('products.description')}</p>
        </header>
        <Tents />
        <div className="lg:mt-12 bg-gray-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('products.moreProductsTitle')}
            </h3>
            <p className="text-gray-700">
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
