import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

export default buildConfig({
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),

  collections: [
    {
      slug: 'media',
      upload: true,
      fields: [{ name: 'caption', type: 'text' }],
    },
  ],

  sharp,

  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT || '',
      },
    }),
  ],
});
