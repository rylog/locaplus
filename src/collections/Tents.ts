import type { CollectionConfig } from 'payload';

export const Tents: CollectionConfig = {
  slug: 'tents',
  labels: {
    singular: 'Tent',
    plural: 'Tents',
  },
  fields: [
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
