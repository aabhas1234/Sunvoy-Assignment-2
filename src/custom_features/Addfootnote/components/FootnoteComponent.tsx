import React, { useState } from 'react';
import { SerializedEditorState } from 'lexical';

export default function FootnoteComponent({
  id,
  content,
  editor,
  nodeKey,
}: {
  id: string;
  content: SerializedEditorState;
  editor: any;
  nodeKey: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <sup
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer', color: 'blue' }}
      >
        [{id}]
      </sup>
      {open && (
        <div className="footnote-modal">
          <div className="modal-content">
            <h4>Footnote [{id}]</h4>
            {/* Render lexical editor in read-only mode here if desired */}
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
