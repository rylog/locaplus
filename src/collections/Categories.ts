import { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  orderable: true,
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
  },
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
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      localized: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) return value.toLowerCase().replace(/\s+/g, '-');
            if (siblingData.name)
              return siblingData.name.toLowerCase().replace(/\s+/g, '-');
          },
        ],
      },
    },
  ],
};
