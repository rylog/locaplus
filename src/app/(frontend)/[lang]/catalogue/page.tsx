'use server';
import configPromise from '@payload-config';
import { setRequestLocale } from 'next-intl/server';
import { getPayload } from 'payload';

import { Catalogue } from '@/components/Catalogue/Catalogue';

const CataloguePage = async ({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>;
}) => {
  const lang = (await params).lang;
  setRequestLocale(lang);
  const payload = await getPayload({ config: configPromise });

  const { docs: catalogueItems } = await payload.find({
    collection: 'catalogue_item',
    depth: 2, // include media URLs
    limit: 100, // or any number you need
  });

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
  });

  return <Catalogue items={catalogueItems} categories={categories} />;
};

export default CataloguePage;
