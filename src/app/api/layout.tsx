import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Locaplus - Tent and Equipment Rentals for Events',
  description:
    'Premium tent and equipment rentals for festivals and events in Quebec.',
  keywords: 'tent rentals, event rentals, marquees, Quebec events',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.locaplus.net/',
    languages: {
      en: 'https://www.locaplus.net/en',
      fr: 'https://www.locaplus.net/fr',
    },
  },
  openGraph: {
    title: 'Locaplus - Tent and Equipment Rentals for Events',
    description:
      'Premium tent and equipment rentals for festivals and events in Quebec.',
    url: 'https://www.locaplus.net',
    siteName: 'Locaplus',
    images: [
      {
        url: 'https://www.locaplus.net/event-tents-locaplus.jpg',
        width: 1200,
        height: 630,
        alt: 'Locaplus Tent Rentals',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locaplus - Tent and Equipment Rentals for Events',
    description:
      'Premium tent and equipment rentals for festivals and events in Quebec.',
    images: ['https://www.locaplus.net/event-tents-locaplus.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <title>Locaplus - Tent and Equipment Rentals for Events</title>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
