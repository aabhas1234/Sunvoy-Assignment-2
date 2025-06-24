import { DecoratorNode, SerializedEditorState, LexicalEditor } from 'lexical';
import { ReactNode } from 'react';
import FootnoteComponent from './components/FootnoteComponent';
import type { JSX } from 'react';

export class FootnoteNode extends DecoratorNode<ReactNode> {
  __id: string;
  __content: SerializedEditorState;

  static getType(): string {
    return 'footnote';
  }

  static clone(node: FootnoteNode): FootnoteNode {
    return new FootnoteNode(node.__id, node.__content, node.__key);
  }

  constructor(id: string, content: SerializedEditorState, key?: string) {
    super(key);
    this.__id = id;
    this.__content = content;
  }

  createDOM(): HTMLElement {
    const sup = document.createElement('sup');
    sup.className = 'footnote-trigger';
    return sup;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(editor: LexicalEditor): ReactNode {
    return (<FootnoteComponent id={this.__id}/>)    ;
  }

  exportJSON() {
    return {
      type: 'footnote',
      version: 1,
      id: this.__id,
      content: this.__content,
    };
  }

  static importJSON(serialized: any): FootnoteNode {
    return new FootnoteNode(serialized.id, serialized.content);
  }
}
