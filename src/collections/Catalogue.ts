// payload/collections/Products.ts
import { CollectionConfig } from 'payload';

export const Catalogue: CollectionConfig = {
  slug: 'catalogue_item',
  orderable: true,
  labels: {
    singular: 'Catalogue Item',
    plural: 'Catalogue Items',
  },
  admin: {
    defaultColumns: [
      'media.thumbnail',
      'general.title',
      'category',
      'pricing.price',
    ],
  },
  fields: [
    // ---------- ORDER FIELD ----------
    {
      name: 'order',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Set the order for manual sorting',
      },
    },
    // ---------- BASIC INFO ----------
    {
      type: 'group',
      name: 'general',
      label: 'General Information',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          unique: true,
          hooks: {
            beforeValidate: [
              ({ value, siblingData }) => {
                if (value) return value.toLowerCase().replace(/\s+/g, '-');
                if (siblingData.title)
                  return siblingData.title.toLowerCase().replace(/\s+/g, '-');
              },
            ],
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // ---------- CATEGORY ----------
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },

    // ---------- IMAGES ----------
    {
      type: 'group',
      name: 'media',
      label: 'Images',
      fields: [
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'gallery',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },

    // ---------- PRICING ----------
    {
      type: 'group',
      name: 'pricing',
      label: 'Pricing',
      fields: [
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'unit',
          type: 'select',
          options: [
            { label: '/day', value: 'day' },
            { label: '/week', value: 'week' },
            { label: '/event', value: 'event' },
          ],
          defaultValue: 'day',
        },
      ],
    },
  ],
};
