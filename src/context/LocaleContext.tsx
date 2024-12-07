import { createContext, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { Outlet, useParams } from 'react-router'; // Import from react-router

import enMessages from '../i18n/en.json';
import frMessages from '../i18n/fr.json';

interface LocaleContextType {
  locale: string;
}

export type Locale = 'en' | 'fr';

const messages: Record<Locale, Record<string, string>> = {
  en: enMessages,
  fr: frMessages,
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = () => {
  const params = useParams<{ locale: Locale }>();

  // Redirect to default locale if none is provided
  const localeValue = params.locale ?? 'fr';

  return (
    <LocaleContext.Provider value={{ locale: localeValue }}>
      <IntlProvider locale={localeValue} messages={messages[localeValue]}>
        <Outlet />
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
