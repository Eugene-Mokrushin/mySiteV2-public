import { useCallback, useRef } from "react"

import { createReactEditorJS } from 'react-editor-js'
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import Table from '@editorjs/table';
import NestedList from '@editorjs/nested-list';
import Embed from '@editorjs/embed';
import Paragraph from '@editorjs/paragraph'
import Underline from '@editorjs/underline';
import RawTool from '@editorjs/raw';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import FootnotesTune from '@editorjs/footnotes'



export default function CustomEditor({ data }) {
  const EDITOR_JS_TOOLS = {
    header: Header,
    image: ImageTool,
    table: Table,
    list: NestedList,
    embed: Embed,
    paragraph: Paragraph,
    underline: Underline,
    raw: RawTool,
    code: CodeTool,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    Marker: Marker,
    footnotes: FootnotesTune
  }
  const editorCore = useRef(null)

  const ReactEditorJS = createReactEditorJS()

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  return (
    <div id="editorWrapper">
      <ReactEditorJS
        onInitialize={() => handleInitialize(data)}
        defaultValue={data}
        tools={EDITOR_JS_TOOLS}
        editorInstance={instance => (editorInstance = instance)}
        readOnly={true}
      />
    </div>
  )
}
