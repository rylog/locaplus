import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.R2_CUSTOM_URL?.replace('https://', '') || '',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withPayload(withNextIntl(nextConfig));
