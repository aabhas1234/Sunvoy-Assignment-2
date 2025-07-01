'use client'

import { useState, useEffect } from 'react'
import { LexicalComposer } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposer'
import { RichTextPlugin } from '@payloadcms/richtext-lexical/lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@payloadcms/richtext-lexical/lexical/react/LexicalHistoryPlugin'
import { ContentEditable } from '@payloadcms/richtext-lexical/lexical/react/LexicalContentEditable'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { 
  $getRoot, 
  $createParagraphNode, 
  $createTextNode, 
  $getSelection, 
  $isRangeSelection,
  TextNode,
  FORMAT_TEXT_COMMAND
} from 'lexical'
import type { EditorState } from 'lexical'
import { 
  TOGGLE_LINK_COMMAND,
  $isLinkNode,
  LinkNode
} from '@payloadcms/richtext-lexical/lexical/link'
import { $isTableSelection } from '@lexical/table'
import { LinkPlugin } from '@payloadcms/richtext-lexical/lexical/react/LexicalLinkPlugin'
import { format } from 'path'


// Floating Toolbar that appears on text selection
const FloatingToolbar = () => {
  const [editor] = useLexicalComposerContext()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isLink, setIsLink] = useState(false)

  useEffect(() => {
    const updateToolbar = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection) || selection.isCollapsed()) {
          setIsVisible(false)
          return
        }

        // Check if selection has formatting using the official Payload approach
        let bold = false
        let italic = false
        let strikethrough = false
        let link = false

        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
          bold = selection.hasFormat('bold')
          italic = selection.hasFormat('italic')
          strikethrough = selection.hasFormat('strikethrough')
        }

        // Debug logging
        console.log('Selection formats:', {
          bold: selection.hasFormat('bold'),
          italic: selection.hasFormat('italic'),
          strikethrough: selection.hasFormat('strikethrough')
        })

        // Check for link nodes
        const nodes = selection.getNodes()
        for (const node of nodes) {
          if ($isLinkNode(node) || $isLinkNode(node.getParent())) {
            link = true
            break
          }
        }

        setIsBold(bold)
        setIsItalic(italic)
        setIsStrikethrough(strikethrough)
        setIsLink(link)

        // Calculate position
        const domSelection = window.getSelection()
        if (domSelection && domSelection.rangeCount > 0) {
          const range = domSelection.getRangeAt(0)
          const rect = range.getBoundingClientRect()
          
          // Get viewport dimensions
          const viewportWidth = window.innerWidth
          
          // Calculate toolbar position
          let x = rect.left + rect.width / 2
          let y = rect.top - 35 // Closer to the text
          
          // Ensure toolbar doesn't go off-screen horizontally
          const toolbarWidth = 200 // Approximate toolbar width
          if (x - toolbarWidth / 2 < 10) {
            x = toolbarWidth / 2 + 10
          } else if (x + toolbarWidth / 2 > viewportWidth - 10) {
            x = viewportWidth - toolbarWidth / 2 - 10
          }
          
          // Ensure toolbar doesn't go off-screen vertically
          // const toolbarHeight = 50 // Approximate toolbar height
          if (y < 10) {
            y = rect.bottom + 10 // Position below the text if not enough space above
          }
          
          setPosition({ x, y })
          setIsVisible(true)
        }
      })
    }

    return editor.registerUpdateListener(updateToolbar)
  }, [editor])

  const handleFormat = (format: 'bold' | 'italic' | 'strikethrough') => {
    console.log('format', format);
    // Try direct formatting instead of dispatchCommand
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
      }
    });
  }

  if (!isVisible) return null

  return (
    <div
      className="floating-toolbar"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '2px',
        alignItems: 'center'
      }}
    >
      <>
        <button
          type="button"
          onClick={() => handleFormat('bold')}
          style={{
            padding: '4px 6px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: isBold ? '#007bff' : '#f8f9fa',
            color: isBold ? 'white' : '#212529',
            border: '1px solid #dee2e6',
            borderRadius: '2px',
            cursor: 'pointer'
          }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() =>{ 
            console.log('Button clicked, isItalic:', isItalic);
            return handleFormat('italic')
          }}
          style={{
            padding: '4px 6px',
            fontSize: '12px',
            fontStyle: 'italic',
            backgroundColor: isItalic ? '#007bff' : '#f8f9fa',
            color: isItalic ? 'white' : '#212529',
            border: '1px solid #dee2e6',
            borderRadius: '2px',
            cursor: 'pointer'
          }}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('Button clicked, isStrikethrough:', isStrikethrough);
            handleFormat('strikethrough')
          }}
          style={{
            padding: '4px 6px',
            fontSize: '12px',
            textDecoration: 'line-through',
            backgroundColor: isStrikethrough ? '#007bff' : '#f8f9fa',
            color: isStrikethrough ? 'black' : '#212529',
            border: '1px solid #dee2e6',
            borderRadius: '2px',
            cursor: 'pointer'
          }}
        >
          S
        </button>
        <button
          type="button"
          onClick={() => {
            // Toggle link using Lexical's command
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, isLink ? null : 'https://');
          }}
          style={{
            padding: '4px 6px',
            fontSize: '12px',
            backgroundColor: isLink ? '#007bff' : '#f8f9fa',
            color: isLink ? 'white' : '#212529',
            border: '1px solid #dee2e6',
            borderRadius: '2px',
            cursor: 'pointer'
          }}
        >
          🔗
        </button>
      </>
    </div>
  )
}

export function DynamicRichTextEditor({ 
  nodekey, 
  existingContent = '',
  onSubmit
}: { 
  nodekey: string
  existingContent?: string
  onSubmit?: (content: string, editorState: EditorState) => void
}) {
  const [editorState, setEditorState] = useState<EditorState | null>(null)

  return (
    <div>
      <LexicalComposer
        initialConfig={{
          namespace: 'FootnoteEditor',
          editable: true,
          onError: (err) => console.error('Editor Error:', err),
          // Add TextNode to support text formatting
          nodes: [LinkNode, TextNode],
          theme: {
            text: {
              bold: 'font-weight: bold !important;',
              italic: 'font-style: italic !important;',
              strikethrough: 'editor-text-strikethrough',
              underline: 'text-decoration: underline !important;',
            },
            paragraph: 'margin: 0.5em 0; line-height: 1.6;',
            root: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
            link: 'color: #0074d9; text-decoration: underline; cursor: pointer;',
          },
        }}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{
                border: '1px solid #ccc',
                minHeight: '200px',
                padding: '1rem',
                borderRadius: '4px',
                color: 'black',
                lineHeight: '1.6',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            />
          }
          placeholder={<div style={{ color: '#888', padding: '1rem' }}>Type your footnote content here...</div>}
          ErrorBoundary={({ children }) => <>{children}</>}
        />
        <HistoryPlugin />
        <FormattingPlugin />
        <FloatingToolbar />
        <LinkPlugin />
        <OnChangePlugin
          onChange={(state: EditorState) => {
            setEditorState(state)
          }}
        />
        {existingContent && <InitializeContentPlugin content={existingContent} />}
      </LexicalComposer>
      <button
        type="button"
        onClick={() => {
          // No functionality - button is clickable but does nothing
          console.log('Button clicked but no action taken')
        }}
        style={{
          marginTop: '2rem',
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Save Footnote
      </button>
    </div>
  )
}

// Plugin to initialize content when the editor is ready
function InitializeContentPlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext()
  
  useEffect(() => {
    if (content) {
      editor.update(() => {
        const root = $getRoot()
        root.clear()
        
        const paragraph = $createParagraphNode()
        const textNode = $createTextNode(content)
        paragraph.append(textNode)
        root.append(paragraph)
      })
    }
  }, [editor, content])

  return null
}

// Plugin to register formatting commands
function FormattingPlugin() {
  const [editor] = useLexicalComposerContext()
  
  useEffect(() => {
    console.log('FormattingPlugin: Registering commands');
    // Register the formatting commands
    editor.registerCommand(
      FORMAT_TEXT_COMMAND,
      (format: any) => {
        console.log('FormattingPlugin: FORMAT_TEXT_COMMAND called with:', format);
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.formatText(format)
          console.log('FormattingPlugin: Format applied successfully');
        }
        return true
      },
      1
    )
    console.log('FormattingPlugin: Commands registered');
  }, [editor])
  
  return null
}