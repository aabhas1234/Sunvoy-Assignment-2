'use client';
import { FootnoteNode } from './custom_nodes/FootNode';
import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { OverrideSuperscriptPlugin } from '@/plugins/SuperscriptOverridePlugin';

export const SuperscriptOverrideClientFeature = createClientFeature({
  plugins: [
    {
      Component: OverrideSuperscriptPlugin ,
      position: 'normal', 
    },
  ],
  nodes:[FootnoteNode]
});
