"use client"
import React from 'react'
import { EditIcon, CloseMenuIcon } from '@payloadcms/ui';

function preventDefault(
    event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>,
  ): void {
    event.preventDefault()
  }

// Helper function to get first few words
function getFirstFewWords(text: string, wordCount: number = 5): string {
  if (!text) return 'No content'
  const words = text.trim().split(/\s+/)
  const firstWords = words.slice(0, wordCount).join(' ')
  return words.length > wordCount ? `${firstWords}...` : firstWords
}

const FloatingEditorIcon = ({ 
  setopen, 
  setopenmodal, 
  footnoteContent 
}: { 
  setopen: any
  setopenmodal: any
  footnoteContent: string
}) => {
  return (
    <div className="link-editor" style={{
      opacity: 1,
      position: 'absolute',
      top: '-40px',
      left: '50%',
      transform: 'translateX(-50%)',
      minWidth: '160px',
      zIndex: 1000
    }} >
      <div className="link-input" >
        <div style={{
          fontSize: '12px',
          color: 'white',
          marginBottom: '8px',
          lineHeight: '1.3',
          maxWidth: '140px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {getFirstFewWords(footnoteContent, 4)}
        </div>
        <React.Fragment>
          <button
            aria-label="Edit link"
            className="link-edit"
            onClick={(event) => {
              event.preventDefault()
              setopen(false)
              setopenmodal(true)
            }}
            onMouseDown={preventDefault}
            tabIndex={0}
            type="button"
          >
            <EditIcon />
          </button>
          <button
            aria-label="Remove link"
            className="link-trash"
            onClick={() => {
              setopen(false)
            }}
            onMouseDown={preventDefault}
            tabIndex={0}
            type="button"
          >
            <CloseMenuIcon />
          </button>
        </React.Fragment>
      </div>
    </div>
  )
}

export default FloatingEditorIcon
