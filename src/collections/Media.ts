import { randomUUID } from 'crypto';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    displayPreview: true,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        const file = req?.file;

        if (file) {
          const ext = file.name.split('.').pop();
          const base = file.name.replace(`.${ext}`, '');

          // Add a short random hash at the end
          const hash = randomUUID().slice(0, 8); // 8-char hash
          const newName = `${base}__${hash}.${ext}`;

          file.name = newName;
          if (data) data.filename = newName;
        }

        return data;
      },
    ],
  },
};
