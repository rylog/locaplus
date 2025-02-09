import { setRequestLocale } from 'next-intl/server';

import { Main } from '../../routes/Main/Main';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>;
}) {
  const lang = (await params).lang;
  setRequestLocale(lang);
  return <Main />;
}
