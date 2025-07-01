'use client'

import {
    createClientFeature,
    toolbarFormatGroupWithItems,
  } from '@payloadcms/richtext-lexical/client'
import { MyNodePlugin } from '@/plugins/MarkNodePlugin'
import { MarkNode } from '@payloadcms/richtext-lexical/lexical/mark'
import { $isMarkNode } from '@payloadcms/richtext-lexical/lexical/mark'
import { IconComponent } from '@/utilities/Icons/HighlighterIcon'
import { HIGHLIGHT_COMMAND } from '@/plugins/MarkNodePlugin'
import { $getSelection, $isNodeSelection, $isRangeSelection, ElementNode, LexicalNode } from '@payloadcms/richtext-lexical/lexical'

export const MyClientFeature = createClientFeature({
    plugins: [
        {
          Component: MyNodePlugin,
          position: 'normal', 
        },
      ],
      toolbarInline: {
        groups: [
          toolbarFormatGroupWithItems([
                {
                  key: 'highlight',
                  ChildComponent: IconComponent,
                  onSelect: ({ editor }) => {
                    editor.dispatchCommand(HIGHLIGHT_COMMAND, undefined)
                  },
                  order: 5,
                  isActive:({ editor }): boolean => {
                    let isMarkActive = false;
                    editor.getEditorState().read(() => {
                      const selection = $getSelection();
                      if (!$isRangeSelection(selection)) return;
                  
                      const nodes = selection.getNodes();
                  
                      for (const node of nodes) {
                        
                        if ($isMarkNode(node)) {
                          isMarkActive = true;
                          break;
                        }
                  
                        
                        const parent = node.getParent();
                        if ($isMarkNode(parent)) {
                          isMarkActive = true;
                          break;
                        }
                      }
                    });
                  
                    return isMarkActive;
                  },
                  
                },
              ]),
        ],
      },
      nodes:[MarkNode]
      
})