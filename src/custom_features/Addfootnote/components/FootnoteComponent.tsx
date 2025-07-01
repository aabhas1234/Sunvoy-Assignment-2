'use client'
import React, { useState } from 'react'
import { SerializedEditorState } from 'lexical'
import { EditFootnoteModal } from './ModalDrawer'
import { relative } from 'path'
import FloatingEditorIcon from './FloatingEditorIcon'

export function FootComponent({
  id,
  nodekey,
  gt,
  fn,
}: {
  id: number
  nodekey: string
  gt: () => string
  fn: (content: string, editorState?: any) => void
}) {
  const [open, setOpen] = useState(false)
  const [openmodal, setopenmodal] = useState(false)
  // console.log(typeof fn, typeof gt, "Footnote");
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <sup
        style={{
          color: 'blue',
          fontSize: '0.8em',
          verticalAlign: 'super',
          lineHeight: '1',
          cursor: 'pointer',
        }}
      >
        <a>{id}</a>
      </sup>
      {open && <FloatingEditorIcon setopen={setOpen} setopenmodal={setopenmodal} footnoteContent={gt()} />}
      {openmodal && (
        <EditFootnoteModal
          id={1}
          gt={gt}
          onClose={() => {
            setopenmodal(false)
          }}
          nodekey={nodekey}
        />
      )}
    </span>
  )
}
