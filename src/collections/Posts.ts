import { MyFeature } from '@/custom_features/mark/serverfeature';
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
        editor:lexicalEditor({admin: { placeholder: 'Type your content here ...'  },features: ({ defaultFeatures, rootFeatures }) => {
          defaultFeatures.forEach((ele)=>{
            
            if(ele.key=='link')
            {
              if (typeof ele.feature === 'function') {
                const result = ele.feature; // ✅ No error now
                console.log(result);
              }
              
            }
            
          })
          return [...defaultFeatures,MyFeature()];
          }})
      },
  ],
  upload: true,
}