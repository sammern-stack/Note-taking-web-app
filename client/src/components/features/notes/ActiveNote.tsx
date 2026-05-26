//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useNotesStore } from "../../../stores";

import { formatDate } from "../../../utils/formatters";

import { Title } from "../../shared";
import { NoteEditor } from ".";

import "./styles.scss";

//—————————————————————————————————————————————————————————————————
// Component
//—————————————————————————————————————————————————————————————————

export const ActiveNote = () => {
  const activeNote = useNotesStore((s) => s.activeNote);

  if (!activeNote) return <div className="note__empty">No note selected</div>;

  const tags = [...activeNote.tags].join(", ");

  const handleChange = (html: string) => {
    // debounce this in production — save after user stops typing
    console.log(html);
  };

  return (
    <div className="home__active-note note">
      <Title size="h1">{activeNote.title}</Title>

      <div className="note__properties">
        <Title size="h2" className="note__tags">
          <span>Tags</span>
          <div className="note__tags-list">{tags}</div>
        </Title>

        <Title size="h2" className="note__dates">
          <div className="note__created">
            {formatDate(activeNote.createdAt)}
          </div>

          <div className="note__updated">
            <span>Last edited</span> {formatDate(activeNote.updatedAt)}
          </div>
        </Title>
      </div>

      <div className="note__divider"></div>

      <div className="note__content">
        <NoteEditor content={activeNote.content} onChange={handleChange} />
      </div>

      <div className="note__divider"></div>

      <div className="note__buttons">
        <div className="note__save-note">Save</div>
        <div className="note__cancel-note">Cancel</div>
      </div>
    </div>
  );
};
