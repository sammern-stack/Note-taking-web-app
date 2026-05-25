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

  const isSameTag = tagFilter === tag;
  const isTagSelected = isSameTag ? "sidebar__tag-item--selected" : "";

  const toggleTag = () => setTagFilter(isSameTag ? "" : tag);

  return (
    <div className={`sidebar__tag-item ${isTagSelected}`} onClick={toggleTag}>
      <TagIcon width="20" height="20" />
      <span>{tag}</span>
      {isSameTag && <ArrowIcon width="15" height="15" />}
    </div>
  );
};
