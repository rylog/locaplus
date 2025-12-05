'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import Logo from '@/../public/Logo_locaplus.png';
import { Link } from '@/i18n/routing';
import type { CatalogueItem, Category } from '@/payload-types';

import { LanguageSelector } from '../NavBar/LanguageSelector';

interface CatalogueProps {
  items: CatalogueItem[];
  categories: Category[];
}

export const Catalogue: React.FC<CatalogueProps> = ({ items, categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const t = useTranslations();

  // Filter items by search and selected category
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      !activeCategory ||
      (item.category &&
        typeof item.category === 'object' &&
        'id' in item.category &&
        categories.find((c) => c.id === (item.category as Category).id)
          ?.name === activeCategory);
    return matchesCategory;
  });

  // Group items by category id
  const groupedByCategoryId: { [key: string]: CatalogueItem[] } = {};
  filteredItems.forEach((item) => {
    let categoryId = '';
    if (typeof item.category === 'string') categoryId = item.category;
    else if (item.category && 'id' in item.category)
      categoryId = item.category.id;
    else categoryId = 'uncategorized';
    if (!groupedByCategoryId[categoryId]) groupedByCategoryId[categoryId] = [];
    groupedByCategoryId[categoryId].push(item);
  });

  return (
    <>
      <header>
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-3 lg:px-8 bg-white"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 content-center"
              aria-label="Go to the home page"
            >
              <ArrowLeftIcon className="w-7 h-7 mr-7 " />
            </Link>
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              aria-label="Go to the home page"
            >
              <Image
                width={191}
                height={100}
                alt="Locaplus Logo"
                src={Logo.src}
                className="h-14 w-auto"
              />
            </Link>
            <h1 className="font-sans font-extralight text-xl content-end ml-4 -mb-1">
              {t('catalogue.title')}
            </h1>
          </div>
          <div className="flex lg:hidden"></div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <LanguageSelector />
          </div>
        </nav>
      </header>
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 ">
          {/* Top filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {/* "All" first and left-most */}
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === null
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-slate-100'
                }`}
              >
                {t('catalogue.allCategories')}
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.name ? null : category.name,
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                    activeCategory === category.name
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-slate-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Catalogue items */}
          {categories.map((category) => {
            const itemsForCategory = groupedByCategoryId[category.id] || [];
            if (itemsForCategory.length === 0) return null;

            return (
              <section
                key={category.id}
                className="mb-12"
                id={`category-${category.name.replace(/\s+/g, '-')}`}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {itemsForCategory.map((item) => (
                    <a key={item.id} className="group">
                      <div className="relative w-full h-72 p-2 overflow-hidden rounded-md bg-gray-100 xl:aspect-square">
                        {typeof item.media?.thumbnail === 'object' &&
                          item.media.thumbnail?.url && (
                            <Image
                              src={item.media.thumbnail.url}
                              alt={item.media.thumbnail.alt || ''}
                              width={256}
                              height={256}
                              className="relative object-contain w-full h-full"
                            />
                          )}
                      </div>
                      <h3 className="mt-4 text-base font-sans font-medium text-gray-700">
                        {item.general.title}
                      </h3>
                      {item.measurements && (
                        <div className="text-sm text-gray-500 font-light mt-1">
                          {item.measurements.diameter && (
                            <span>{item.measurements.diameter}&#34;</span>
                          )}
                          {!item.measurements.diameter &&
                            item.measurements.width &&
                            item.measurements.length && (
                              <span>
                                {item.measurements.width}&#34;x
                                {item.measurements.length}&#34;
                              </span>
                            )}
                        </div>
                      )}
                      {item.pricing?.price && (
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          {item.pricing.price} {item.pricing.unit}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
};
