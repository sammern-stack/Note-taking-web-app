//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useNotesStore } from "../../../stores";

import { Selectable } from "../../shared";

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
  const toggleTag = () => setTagFilter(isSameTag ? "" : tag);

  return (
    <Selectable
      className="sidebar__tag-item"
      isSelected={isSameTag}
      onSelect={toggleTag}
    >
      <TagIcon width="20" height="20" />
      <span>{tag}</span>
      {isSameTag && <ArrowIcon width="15" height="15" />}
    </Selectable>
  );
};
