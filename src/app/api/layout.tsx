import { ReactNode } from 'react';

export const metadata = {
  title: 'Locaplus - Tent Rentals for Events',
  description: 'Rent tents, and equipment for your event in Quebec.',
  keywords: 'tent rentals, event rentals, marquees, Quebec events',
  robots: 'index, follow', // Allows Google to index the site
  alternates: {
    canonical: 'https://www.locaplus.net/',
  },
  openGraph: {
    title: 'Locaplus - Tent Rentals for Events',
    description: 'Premium tent rentals for festivals and events in Quebec.',
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
    title: 'Locaplus - Tent Rentals',
    description: 'Tent and equipment rentals for events in Quebec.',
    images: ['https://www.locaplus.net/event-tents-locaplus.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
