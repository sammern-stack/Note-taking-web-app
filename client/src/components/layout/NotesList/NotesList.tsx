//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useNotesStore } from "../../../stores";
import type { INote } from "../../../types";

import { formatDate } from "../../../utils/formatters";

import { Selectable } from "../../shared";

import "./NotesList.scss";

//—————————————————————————————————————————————————————————————————
// Helpers
//—————————————————————————————————————————————————————————————————

const shouldDividerShown = (
  arr: INote[],
  item: INote,
  selected: string,
): boolean => {
  const index = arr.findIndex((n) => n._id === item._id);
  const selectedIndex = arr.findIndex((n) => n._id === selected);

  const isLast = index === arr.length - 1;
  const isSelected = index === selectedIndex;
  const isAboveSelected = index === selectedIndex - 1;

  return !isLast && !isSelected && !isAboveSelected;
};

//—————————————————————————————————————————————————————————————————
// Component
//—————————————————————————————————————————————————————————————————

export const NotesList = () => {
  const notes = useNotesStore((s) => s.notes);
  const noteSelected = useNotesStore((s) => s.noteSelected);
  const setNoteSelected = useNotesStore((s) => s.setNoteSelected);

  return (
    <div className="home__notes-list notes">
      {notes.map((note) => (
        <>
          <Selectable
            className="notes__note"
            isSelected={noteSelected === note._id}
            onSelect={() => setNoteSelected(note._id)}
          >
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
          </Selectable>

          {shouldDividerShown(notes, note, noteSelected) && (
            <div className="home__notes-divider"></div>
          )}
        </>
      ))}
    </div>
  );
};
