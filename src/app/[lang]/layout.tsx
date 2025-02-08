import '@/styles/globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { LocaleContextProvider } from '../../context/LocaleContext';
import QueryClientContextProvider from '../../context/QueryClientContext';

export type Locale = 'en' | 'fr';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const lang = (await params).lang;
  const titles = {
    en: 'Locaplus - Tent Rentals for Events',
    fr: 'Locaplus - Location de tentes pour événements',
  };

  const descriptions = {
    en: 'Premium tent and equipment rentals for festivals and events in Quebec.',
    fr: "Location de tentes et d'équipement pour festivals et événements au Québec.",
  };

  const keywords = {
    en: 'tent rentals, event rentals, marquees, Quebec events, event planning',
    fr: "location de tentes, location d'équipement, tentes pour événements, événements au Québec, planification d'événements",
  };

  const canonicalUrls = {
    en: 'https://www.locaplus.net/en',
    fr: 'https://www.locaplus.net/fr',
  };

  const imageAlts = {
    en: 'Tent Rentals for Events',
    fr: 'Location de tentes pour événements',
  };

  return {
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: keywords[lang] || keywords['en'],
    robots: 'index, follow',
    openGraph: {
      title: titles[lang] || titles['en'],
      description: descriptions[lang] || descriptions['en'],
      url: canonicalUrls[lang] || canonicalUrls['en'],
      siteName: 'Locaplus',
      images: [
        {
          url: 'https://www.locaplus.net/event-tents-locaplus.jpg',
          width: 1200,
          height: 630,
          alt: imageAlts[lang],
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang] || titles['en'],
      description: descriptions[lang] || descriptions['en'],
      images: ['https://www.locaplus.net/event-tents-locaplus.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: 'https://www.locaplus.net/',
      languages: {
        en: 'https://www.locaplus.net/en',
        fr: 'https://www.locaplus.net/fr',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: 'en' | 'fr' }>;
}>) {
  const lang = (await params).lang;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <QueryClientContextProvider>
          <LocaleContextProvider locale={lang}>
            {children}
          </LocaleContextProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
