"use client"

import { createContext, ReactNode, useContext } from 'react';
import { IntlProvider } from 'react-intl';

import enMessages from '../i18n/en.json';
import frMessages from '../i18n/fr.json';

export type Locale = 'en' | 'fr';

interface LocaleContextType {
  locale: Locale;
}

const messages: Record<string, Record<string, string>> = {
    en: enMessages,
    fr: frMessages,
  };
  

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleContextProvider = ({locale, children }: { locale: Locale, children: ReactNode }) => {
  return (
    <LocaleContext value={{locale}}>
        <IntlProvider locale={locale} messages={messages[locale]}>
            {children}
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
