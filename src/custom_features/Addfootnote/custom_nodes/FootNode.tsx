import { DecoratorNode, LexicalEditor, SerializedLexicalNode } from 'lexical'
import { ReactNode } from 'react'
import { FootComponent } from '@/custom_features/Addfootnote/components/FootnoteComponent'
import type { LexicalNode } from '@payloadcms/richtext-lexical/lexical'
export type SerializedFootnoteNode = {
  id: number
  type: 'footnote'
  version: 1
  content: string
} & SerializedLexicalNode

export class FootnoteNode extends DecoratorNode<ReactNode> {
  __id: number
  __content: string
  static getType(): string {
    return 'footnote'
  }
  setcontent(content: string) {
    console.log('setcontent called with:', content)
  }
  getcontent(): string {
    return this.__content
  }
  static clone(node: FootnoteNode): FootnoteNode {
    return new FootnoteNode(node.__id, node.__content, node.__key)
  }

  constructor(id: number, content: string, key?: string) {
    super(key)
    this.__id = id
    this.__content = content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div')

    div.style.position = 'relative'
    div.style.display = 'inline-block'
    return div
  }

  updateDOM(): boolean {
    return false
  }

  isInline(): boolean {
    return true // so it behaves like <sup> inside a line
  }

  getID(): number {
    return this.__id
  }

  decorate(editor: LexicalEditor): ReactNode {
    return (
      <FootComponent
        id={this.__id}
        nodekey={this.getKey()}
        gt={() => this.getcontent()}
        fn={(content: string, editorState?: any) => {
          // No-op function since modal is non-functional
          console.log('Footnote update disabled - modal is non-functional')
        }}
      />
    )
  }
  exportJSON(): SerializedFootnoteNode {
    return {
      ...super.exportJSON(),
      type: 'footnote',
      version: 1,
      id: this.__id,
      content: this.__content,
    }
  }

  static importJSON(serializedNode: SerializedFootnoteNode): FootnoteNode {
    return new FootnoteNode(serializedNode.id, serializedNode.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  }
}

export function $isFootnoteNode(node: LexicalNode | null | undefined): node is FootnoteNode {
  return node instanceof FootnoteNode
}
