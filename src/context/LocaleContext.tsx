import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IntlProvider } from 'react-intl';
import { useLocation } from 'react-router'; // Import from react-router

import enMessages from '../i18n/en.json';
import frMessages from '../i18n/fr.json';

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const initialLocale =
    location.pathname.split('/')[1] === 'fr' ||
    location.pathname.split('/')[1] === 'en'
      ? location.pathname.split('/')[1]
      : 'fr'; // Default to 'fr' if no valid locale is found
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    const pathLocale = location.pathname.split('/')[1]; // Assume the locale is at the start of the path
    if (pathLocale === 'fr' || pathLocale === 'en') {
      setLocale(pathLocale);
    }
  }, [location.pathname]);

  const messages = locale === 'en' ? enMessages : frMessages;

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
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
