import { useCurrentEditor, useEditorState } from "@tiptap/react";

export const Toolbar = () => {
  const { editor } = useCurrentEditor();

  const editorState = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      isBold: e?.isActive("bold"),
      isItalic: e?.isActive("italic"),
      isStrike: e?.isActive("strike"),
      isHeading1: e?.isActive("heading", { level: 1 }),
      isHeading2: e?.isActive("heading", { level: 2 }),
    }),
  });

  if (!editor || !editorState) return null;

  const { isBold, isItalic, isStrike, isHeading1, isHeading2 } = editorState;

  if (!editor) return null;

  return (
    <div className="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar__btn ${isBold ? "toolbar__btn--active" : ""}`}
      >
        B
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar__btn ${isItalic ? "toolbar__btn--active" : ""}`}
      >
        I
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`toolbar__btn ${isStrike ? "toolbar__btn--active" : ""}`}
      >
        S
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`toolbar__btn ${isHeading1 ? "toolbar__btn--active" : ""}`}
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`toolbar__btn ${isHeading2 ? "toolbar__btn--active" : ""}`}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="toolbar__btn"
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="toolbar__btn"
      >
        1. List
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="toolbar__btn"
        disabled={!editor.can().undo()}
      >
        Undo
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="toolbar__btn"
        disabled={!editor.can().redo()}
      >
        Redo
      </button>
    </div>
  );
};
