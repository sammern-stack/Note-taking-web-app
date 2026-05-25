//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useNotesStore } from "../../../stores";

import TagIcon from "../../../assets/images/icon-tag.svg?react";
import ArrowIcon from "../../../assets/images/icon-arrow-left.svg?react";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface ITagItem {
  tag: string;
}

//—————————————————————————————————————————————————————————————————
// Component
//—————————————————————————————————————————————————————————————————

export const TagItem = ({ tag }: ITagItem) => {
  const tagFilter = useNotesStore((s) => s.tagFilter);
  const setTagFilter = useNotesStore((s) => s.setTagFilter);

  return (
    <div
      className={`sidebar__tag-item ${tagFilter === tag ? "sidebar__tag-item--selected" : ""}`}
      onClick={() => setTagFilter(tagFilter === tag ? "" : tag)}
    >
      <TagIcon width="20" height="20" />
      <span>{tag}</span>
      {tagFilter === tag && <ArrowIcon width="15" height="15" />}
    </div>
  );
};
