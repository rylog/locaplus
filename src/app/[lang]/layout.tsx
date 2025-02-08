import '@/styles/globals.css';
import { LocaleContextProvider } from '../../context/LocaleContext';
import QueryClientContextProvider from '../../context/QueryClientContext';

export type Locale = 'en' | 'fr';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
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
