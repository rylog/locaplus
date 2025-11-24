import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { ReactNode } from 'react';

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

export default function TemposLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
