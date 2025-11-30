import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
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
    afterChange: [
      async () => {
        // Automatically set the order field to match the _order value
        revalidatePath('/en/catalogue');
        revalidatePath('/fr/catalogue');
      },
    ],
    afterDelete: [
      async () => {
        revalidatePath('/en/catalogue');
        revalidatePath('/fr/catalogue');
      },
    ],
  },
};
