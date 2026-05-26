import "./styles.scss";

import { useNotesStore } from "../../../stores";
import { formatDate } from "../../../utils/formatters";

export const ActiveNote = () => {
  const activeNote = useNotesStore((s) => s.activeNote);

  if (!activeNote) return <div className="note__empty">No note selected</div>;

  return (
    <div className="home__active-note note">
      <div className="note__title">{activeNote.title}</div>

      <div className="note__properties">
        <div className="note__tags">
          <span>Tags</span>
          {activeNote.tags.map((t) => (
            <div>{t}</div>
          ))}
        </div>

        <div className="notes__dates">
          <div className="note__created">
            <span>Created:</span>
            {formatDate(activeNote.createdAt)}
          </div>

          <div className="note__updated">
            <span>Updated:</span>
            {formatDate(activeNote.updatedAt)}
          </div>
        </div>
      </div>

      <div className="note__divider"></div>

      <div className="note__content">{activeNote.content}</div>

      <div className="note__divider"></div>

      <div className="note__buttons">
        <div className="note__save-note">Save</div>
        <div className="note__cancel-note">Cancel</div>
      </div>
    </div>
  );
};
