import { useLocale, useTranslations } from 'next-intl';

import { SECTIONS } from '../../../../constants/sections';
import ContactInfo from './ContactInfo';
import QuoteForm from './QuoteForm';

export const Contact = () => {
  const locale = useLocale();
  const t = useTranslations('HomePage');
  return (
    <section id={SECTIONS[locale].CONTACT} className="lg:bg-gray-100 bg-white">
      <div className="flex flex-col max-w-2xl pt-8 lg:pt-12 lg:max-w-6xl justify-self-center gap-4 mx-4">
        <header>
          <h1 className="text-lg/7 font-semibold text-primary text-center">
            {t('nav.contactUs')}
          </h1>
          <h2 className="mx-auto mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl text-center">
            {t('contact.title')}
          </h2>
          <p className="text-center mt-2 mb-6 lg:mb-0 text-gray-600 px-0 lg:px-4">
            {t('contact.description')}
          </p>
        </header>
      </div>
      <div className="flex lg:py-10 justify-center">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 mx-0 lg:max-w-7xl lg:mx-8 lg:rounded-2xl bg-white overflow-hidden">
          <ContactInfo />
          <QuoteForm />
        </div>
      </div>
    </section>
  );
};
