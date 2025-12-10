import configPromise from '@payload-config';
import { setRequestLocale } from 'next-intl/server';
import { getPayload } from 'payload';

import { Main } from '../../../routes/Main/Main';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>;
}) {
  const lang = (await params).lang;
  setRequestLocale(lang);
  const payload = await getPayload({ config: configPromise });
  const { docs: tents } = await payload.find({
    collection: 'tents',
    limit: 100,
    depth: 2,
    locale: lang, // or dynamic
  });

  // Reversed until I fix the sorting in Payload CMS
  return <Main tents={tents.reverse() ?? []} />;
}
