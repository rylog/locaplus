import { setRequestLocale } from 'next-intl/server';

import { Tempos } from '@/routes/Tempos/Tempos';

export default async function TemposPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>;
}) {
  const lang = (await params).lang;
  setRequestLocale(lang);
  return <Tempos />;
}
