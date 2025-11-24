import { setRequestLocale } from 'next-intl/server';

import { Careers } from '@/routes/Careers/Careers';

const CareersPage = async ({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>;
}) => {
  const lang = (await params).lang;
  setRequestLocale(lang);
  return <Careers />;
};

export default CareersPage;
