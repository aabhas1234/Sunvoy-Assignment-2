import { lexicalEditor, lexicalHTMLField } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import AutoHeightHtmlField from '@/custom_features/Addfootnote/components/AutoHeightHtmlField';
import { MyFeature } from '@/custom_features/mark/serverfeature';
import { SuperscriptOverrideServerFeature } from '@/custom_features/Addfootnote/superscriptoverridefeature';

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
      editor: lexicalEditor({
        admin: { placeholder: 'Type your content here ...' },
        features: ({ defaultFeatures }) => {
          const filteredFeatures = defaultFeatures.filter(
            (feature) => feature.key !== 'subscript'
          );
          const finalFeatures = [
            ...filteredFeatures,
            SuperscriptOverrideServerFeature(),
            MyFeature(),
          ];
          return finalFeatures;
        }
      })
    },
    lexicalHTMLField({
      htmlFieldName: 'content_html',
      lexicalFieldName: 'content',
      converters: ({ defaultConverters }) => {
        return {
          ...defaultConverters,
          footnote: ({ node }) => {
            return `<sup><a href="#footnote-${node.id}" id="footnote-ref-${node.id}">${node.id}</a></sup><!--FOOTNOTE_DATA:${JSON.stringify({ id: node.id, content: node.content })}-->`;
          },
          mark: async ({ node, nodesToHTML }) => {
            let childrenHTML = '';
            if (Array.isArray(node.children)) {
              const result = await nodesToHTML({ nodes: node.children });
              childrenHTML = Array.isArray(result) ? result.join('') : result;
            } else if (node.children && typeof node.children === 'object') {
              const result = await nodesToHTML({ nodes: [node.children] });
              childrenHTML = Array.isArray(result) ? result.join('') : result;
            } else if (node.text) {
              childrenHTML = node.text;
            } else {
              childrenHTML = '';
            }
            return `<mark>${childrenHTML}</mark>`;
          }
        }
      }
    }),
    {
      name: 'content_html_with_footer',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: true,
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (typeof doc.content_html === 'string') {
          const footnoteRegex = /<!--FOOTNOTE_DATA:(.+?)-->/g;
          const footnotes: Array<{ id: number; content: string }> = [];
          let match;
          let processedHTML = doc.content_html;
          while ((match = footnoteRegex.exec(doc.content_html)) !== null) {
            try {
              const footnoteData = JSON.parse(match[1]);
              footnotes.push(footnoteData);
            } catch (e) {
              console.error('[Post afterRead] Error parsing footnote data:', e);
            }
          }
          processedHTML = processedHTML.replace(footnoteRegex, '');
          if (footnotes.length > 0) {
            const footerHTML = `\n<footer>\n<ul>\n${footnotes.map(fn => `<li id=\"footnote-${fn.id}\">${fn.content}</li>`).join('')}\n</ul>\n</footer>`;
            processedHTML += footerHTML;
          }
          doc.content_html_with_footer = processedHTML;
        }
        return doc;
      }
    ]
  }
}