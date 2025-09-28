import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'fr',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/careers': {
      en: '/careers',
      fr: '/carrieres',
    },
    '/tempos': {
      en: '/tempos',
      fr: '/abris-tempo',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
