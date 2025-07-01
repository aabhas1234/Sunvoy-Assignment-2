import { createServerFeature } from '@payloadcms/richtext-lexical';
import { FootnoteNode } from './custom_nodes/FootNode';
export const SuperscriptOverrideServerFeature = createServerFeature({
  key: 'superscript-override',
  feature: {
    ClientFeature: './custom_features/Addfootnote/clientoverridefeature#SuperscriptOverrideClientFeature',
    nodes: [
        {node: FootnoteNode}
       ],  
  },     
});

