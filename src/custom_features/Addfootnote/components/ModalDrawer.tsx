'use client'
import React from 'react'
import { DynamicRichTextEditor } from './DynamicRichtextEditor'

type EditFootnoteModalProps = {
  id: number
  gt: () => string
  onClose: () => void
  nodekey: string
}

export const EditFootnoteModal: React.FC<EditFootnoteModalProps> = ({
  id,
  gt,
  onClose,
  nodekey,
}) => {
  
  const existingContent = gt()
  
  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          width: '90vw',
          maxWidth: '800px',
          maxHeight: '80vh',
          borderRadius: '8px',
          zIndex: 1000,
          overflow: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ color: 'black' }}>Edit Footnote</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'black',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontWeight: 'bold', color: 'black' }}>
            Content <span style={{ color: 'red' }}>*</span>
          </label>

          <div style={{ border: '1px solid #ccc', marginTop: '0.5rem' }}>
            <DynamicRichTextEditor 
              nodekey={nodekey} 
              existingContent={existingContent}
            />
          </div>
        </div>
      </div>
    </>
  )
}
