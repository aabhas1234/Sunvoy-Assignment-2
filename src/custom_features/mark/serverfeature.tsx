import { createServerFeature, createNode } from '@payloadcms/richtext-lexical'
import { MarkNode } from '@payloadcms/richtext-lexical/lexical/mark'

export const MyFeature = createServerFeature({
  feature: {
    nodes: [{node:MarkNode}],
  },
  key: 'myFeature',
})