import type { CollectionConfig } from 'payload'

export const Post: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'content',
        type: 'richText',
        required: true,
      },
  ],
  upload: true,
}