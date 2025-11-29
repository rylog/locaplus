'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import type { CatalogueItem, Category } from '@/payload-types';

interface CatalogueProps {
  items: CatalogueItem[];
  categories: Category[];
}

export const Catalogue: React.FC<CatalogueProps> = ({ items, categories }) => {
  const categoryNames = categories.map((cat) => cat.name);
  const [search, setSearch] = useState('');

  const filteredItems = items.filter((item) =>
    item.general.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Group items by category id
  const groupedByCategoryId: { [key: string]: CatalogueItem[] } = {};
  filteredItems.forEach((item) => {
    let categoryId = '';
    if (typeof item.category === 'string') {
      categoryId = item.category;
    } else if (item.category && 'id' in item.category) {
      categoryId = item.category.id;
    } else {
      categoryId = 'uncategorized';
    }
    if (!groupedByCategoryId[categoryId]) {
      groupedByCategoryId[categoryId] = [];
    }
    groupedByCategoryId[categoryId].push(item);
  });

  return (
    <main className="bg-white">
      <div className="flex flex-row">
        {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-56 bg-gray-50 border-r border-gray-200 p-6 hidden lg:block">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categoryNames.map((category) => (
              <li key={category}>
                <a
                  href={`#category-${category.replace(/\s+/g, '-')}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        {/* Main content */}
        <div className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <input
            type="text"
            placeholder="Search catalogue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 p-2 border rounded w-full"
          />
          {categories.map((category) => (
            <section
              key={category.id}
              className="mb-12"
              id={`category-${category.name.replace(/\s+/g, '-')}`}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {(groupedByCategoryId[category.id] || []).map((item) => (
                  <a key={item.id} href="#" className="group">
                    <div className="relative w-full h-72 p-2 overflow-hidden rounded-md bg-gray-100 xl:aspect-square">
                      {typeof item.media?.thumbnail === 'object' &&
                        item.media.thumbnail?.url && (
                          <Image
                            src={item.media.thumbnail.url}
                            alt={item.media.thumbnail.alt || ''}
                            width={256}
                            height={256}
                            className="relative object-contain w-full h-full group-hover:opacity-75 transition-opacity duration-200"
                          />
                        )}
                    </div>
                    <h3 className="mt-4 text-base font-sans font-medium text-gray-700">
                      {item.general.title}
                    </h3>
                    {/* Dimensions */}
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
          ))}
        </div>
      </div>
    </main>
  );
};
