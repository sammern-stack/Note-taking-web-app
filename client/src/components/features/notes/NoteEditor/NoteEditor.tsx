//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useEffect, useMemo } from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

import { Toolbar } from "../";

import "./NoteEditor.scss";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface NoteEditorProps {
  content: string;
  onChange: (html: string) => void;
  editable?: boolean;
}

//—————————————————————————————————————————————————————————————————
// Constants
//—————————————————————————————————————————————————————————————————

const extensions = [StarterKit];

//—————————————————————————————————————————————————————————————————
// Component
//—————————————————————————————————————————————————————————————————

export const NoteEditor = ({
  content,
  onChange,
  editable = true,
}: NoteEditorProps) => {
  const editor = useEditor({
    extensions,
    content,
    editable,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="note-editor">
        <EditorContent editor={editor} className="note-editor__content" />
        <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>{editable && <Toolbar />}</BubbleMenu>
      </div>
    </EditorContext.Provider>
  );
};
