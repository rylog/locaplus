// src/payload/collections/catalogue.ts

import { CollectionConfig } from 'payload';

export const Catalogue: CollectionConfig = {
  slug: 'catalogue',
  labels: {
    singular: 'Catalogue Item',
    plural: 'Catalogue Items',
  },
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'description',
      type: 'richText', // Uses Lexical editor
      required: false,
    },

    {
      name: 'photos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Tents', value: 'tents' },
        { label: 'Chairs', value: 'chairs' },
        { label: 'Tables', value: 'tables' },
        { label: 'Flooring', value: 'flooring' },
        { label: 'Equipment', value: 'equipment' },
      ],
      required: true,
    },

    {
      name: 'features',
      type: 'array',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [{ name: 'text', type: 'text', required: true }],
    },

    {
      name: 'specs',
      type: 'group',
      fields: [
        { name: 'width', type: 'number' },
        { name: 'length', type: 'number' },
        { name: 'capacity', type: 'number' },
      ],
    },

    {
      name: 'price',
      type: 'text',
      required: false,
      admin: {
        description: 'Price in CAD',
      },
    },
  ],
};
