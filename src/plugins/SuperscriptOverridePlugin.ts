'use client'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useState } from 'react'
import { FORMAT_TEXT_COMMAND, COMMAND_PRIORITY_CRITICAL } from 'lexical'
import {
  $getSelection,
  $getRoot,
  $isParagraphNode,
  $createTextNode,
} from '@payloadcms/richtext-lexical/lexical'
import { FootnoteNode } from '@/custom_features/Addfootnote/custom_nodes/FootNode'
import { $isFootnoteNode } from '@/custom_features/Addfootnote/custom_nodes/FootNode'

export const OverrideSuperscriptPlugin = () => {
  const [editor] = useLexicalComposerContext()

  console.log('ok')

  useEffect(() => {
    return editor.registerCommand(
      FORMAT_TEXT_COMMAND,
      (formatType) => {
        if (formatType === 'superscript') {
          console.log('Custom superscript logic triggered')
          editor.update(() => {
            const root = $getRoot()
            const lastChild = root.getChildren().at(-1)
            console.log(lastChild)
            if (lastChild && $isParagraphNode(lastChild)) {
              const lastinsertedchild = lastChild.getChildren().at(-1)
              console.log(lastinsertedchild)
              let counter
              if ($isFootnoteNode(lastinsertedchild)) {
                counter = lastinsertedchild.getID() + 1
              } else {
                counter = 1
              }

              const superscriptNode = new FootnoteNode(counter, '')
              lastChild.append(superscriptNode)
            }
          })

          return true
        }
        return false
      },
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor])

  return null
}
