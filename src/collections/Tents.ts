import type { CollectionConfig } from 'payload';

export const Tents: CollectionConfig = {
  slug: 'tents',
  orderable: true,
  labels: {
    singular: 'Tent',
    plural: 'Tents',
  },
  defaultSort: 'order',
  fields: [
        {
      name: 'order',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Set the order for manual sorting',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true, // if you have multiple languages
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Payload Media library
      required: true,
    },
    {
      name: 'spaceRequired',
      type: 'text',
      localized: true,
    },
    {
      name: 'minCapacity',
      type: 'number',
    },
    {
      name: 'maxCapacity',
      type: 'number',
    },
  ],
};
