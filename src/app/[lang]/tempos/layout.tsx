import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Script from 'next/script';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import QueryClientContextProvider from '@/context/QueryClientContext';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  // Use params.slug for route detection
  const { lang } = (await params) as {
    lang: Locale;
  };

  const titles = {
    en: 'Tempo Purchase, Installation and Rentals - Locaplus',
    fr: 'Achat, installation et location d’abris Tempo - Locaplus',
  };

  const descriptions = {
    en: 'Tempo shelters for purchase, rental, and installation services in Quebec.',
    fr: "Abris Tempo à vendre, à louer et services d'installation au Québec.",
  };

  const keywords = {
    en: 'tempo rentals, tempo purchase, tempo installation',
    fr: "location d'abris Tempo, achat d'abris Tempo, installation d'abris Tempo",
  };

  const canonicalUrls = {
    en: 'https://www.locaplus.net/en/tempos',
    fr: 'https://www.locaplus.net/fr/abris-tempo',
  };

  const imageAlts = {
    en: 'Tent Rentals for Events',
    fr: 'Location de tentes pour événements',
  };

  // Default OG image and description
  const ogImage = 'https://www.locaplus.net/tempo-display.jpg';
  const description = descriptions[lang] || descriptions['en'];

  return {
    title: titles[lang] || titles['en'],
    description,
    keywords: keywords[lang] || keywords['en'],
    robots: 'index, follow',
    openGraph: {
      title: titles[lang] || titles['en'],
      description,
      url: canonicalUrls[lang] || canonicalUrls['en'],
      siteName: 'Locaplus',
      images: [
        {
          url: ogImage,
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
      description,
      images: [ogImage],
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: 'https://www.locaplus.net/tempos',
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
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang as Locale;

  if (!routing.locales.includes(lang)) {
    redirect('/fr');
  }

  setRequestLocale(lang);

  const messages = await getMessages();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* GA4 snippet */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-GHZM8KBSMM`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GHZM8KBSMM');
          `}
        </Script>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=AW-16978918656`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GHZM8KBSMM');
          `}
        </Script>
      </head>
      <body className="bg-white" suppressHydrationWarning>
        <QueryClientContextProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </QueryClientContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
