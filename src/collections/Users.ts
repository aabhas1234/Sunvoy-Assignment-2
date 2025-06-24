import type { CollectionConfig } from 'payload'
import { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { defaultEditorFeatures, lexicalEditor } from '@payloadcms/richtext-lexical'
import { MarkNode } from '@payloadcms/richtext-lexical/lexical/mark'
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
        console.log(MarkNode);
        return [...defaultFeatures, ...rootFeatures];
      }})
    }
  ],
 
}
