import { createServerFeature, createNode } from '@payloadcms/richtext-lexical'
import { MarkNode, type SerializedMarkNode  } from '@payloadcms/richtext-lexical/lexical/mark'
import type { ElementNode, LexicalNode } from 'lexical'

export const MyFeature = createServerFeature({
  feature: {
    nodes: [
       {node: MarkNode}
      ],
      ClientFeature: './custom_features/mark/clientfeature#MyClientFeature',
  },
  key: 'myFeature',
})