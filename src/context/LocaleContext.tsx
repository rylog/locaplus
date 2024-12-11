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
    <LocaleContext value={{ locale: localeValue }}>
      <IntlProvider locale={localeValue} messages={messages[localeValue]}>
        <meta
          name="description"
          content="Locaplus specializes in canopy and event tent rentals across the Eastern Townships, providing high-quality tents, chairs, tables, and equipment for festivals, weddings, and special events. Serving Bromont, Granby, South Shore, Sherbrooke, and Magog since 1991."
        />

        <Outlet />
      </IntlProvider>
    </LocaleContext>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
