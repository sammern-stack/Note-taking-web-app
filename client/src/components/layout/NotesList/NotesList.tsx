import { useNotesStore } from "../../../stores";
import { formatDate } from "../../../utils/formatters";
import "./NotesList.scss";

export const NotesList = () => {
  const notes = useNotesStore((s) => s.notes);

  return (
    <div className="home__notes-list notes">
      {notes.map((note) => (
        <>
          <div className="notes__note">
            <span className="notes__note-title">{note.title}</span>

            <div className="notes__note-tags">
              {note.tags.map((tag) => (
                <div className="notes__note-tag">{tag}</div>
              ))}
            </div>

            <div className="notes__note-dates">
              <div className="notes__note-created">
                {formatDate(note.createdAt)}
              </div>

              <div className="notes__note-updated">
                <span>Updated: </span>
                {formatDate(note.updatedAt)}
              </div>
            </div>
          </div>

          <div className="home__notes-divider"></div>
        </>
      ))}
    </div>
  );
};
