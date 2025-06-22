import type { CollectionConfig } from 'payload'
import { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { defaultEditorFeatures, lexicalEditor } from '@payloadcms/richtext-lexical'
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name:'Phone-no',
      type:'number'
    },
    {
      name:'Content',
      type:'richText',
      editor :lexicalEditor({admin: { placeholder: 'Type your content here ...'  },features: ({ defaultFeatures, rootFeatures }) => {
        console.log(defaultFeatures);
        return [...defaultFeatures, ...rootFeatures];
      }})
    }
  ],
 
}
