//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useNotesStore } from "../../../stores";

import { Selectable } from "../../shared";

import HomeIcon from "../../../assets/images/icon-home.svg?react";
import ArchivedIcon from "../../../assets/images/icon-archive.svg?react";
import ArrowIcon from "../../../assets/images/icon-arrow-left.svg?react";

import "./SideBar.scss";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface MainNavItemProps {
  label: string;
  filter: "All" | "Archived";
}

//—————————————————————————————————————————————————————————————————
// Component
//—————————————————————————————————————————————————————————————————

export const MainNavItem = ({ label, filter }: MainNavItemProps) => {
  const mainFilter = useNotesStore((s) => s.mainFilter);
  const setMainFilter = useNotesStore((s) => s.setMainFilter);

  const fetchAllNotes = useNotesStore((s) => s.fetchAllNotes);
  const fetchArchivedNotes = useNotesStore((s) => s.fetchArchivedNotes);

  const NavIcon = {
    All: HomeIcon,
    Archived: ArchivedIcon,
  }[filter];

  const isSelected = mainFilter === filter;
  const handleSelect = () => {
    setMainFilter(filter);
    if (filter === "All") fetchAllNotes();
    if (filter === "Archived") fetchArchivedNotes();
  };

  return (
    <Selectable
      className="sidebar__top-nav-item"
      isSelected={isSelected}
      onSelect={handleSelect}
    >
      <NavIcon />
      <span>{label}</span>
      {isSelected && <ArrowIcon width="15" height="15" />}
    </Selectable>
  );
};
