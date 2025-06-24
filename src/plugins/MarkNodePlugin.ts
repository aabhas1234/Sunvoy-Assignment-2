'use client'
import type { LexicalCommand } from '@payloadcms/richtext-lexical/lexical'
import { MarkNode } from 'node_modules/@lexical/mark/MarkNode'
import { $wrapSelectionInMarkNode, $unwrapMarkNode, $isMarkNode } from '@payloadcms/richtext-lexical/lexical/mark'
import {
  createCommand,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
} from '@payloadcms/richtext-lexical/lexical'

import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'

import { useEffect } from 'react'

import type { PluginComponent } from '@payloadcms/richtext-lexical' 
import { createNode } from '@payloadcms/richtext-lexical'


export const HIGHLIGHT_COMMAND: LexicalCommand<void> = createCommand(
  'HIGHLIGHT_COMMAND',
)


export const MyNodePlugin: PluginComponent = () => {
 
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      HIGHLIGHT_COMMAND,
      (type) => {
        const selection = $getSelection();
        
        if (!$isRangeSelection(selection)) {
          return false
        }
        const node = selection.getNodes()[0].getParent();
        console.log($isMarkNode(node));
        console.log("ok");
        if (!$isMarkNode(node)) {
          console.log("marknode");
          $wrapSelectionInMarkNode(selection, false, 'generic');
        } else {
          console.log("no-marknode");
          $unwrapMarkNode(node);
        }

        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return null
}