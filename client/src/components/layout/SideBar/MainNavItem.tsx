//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useNotesStore } from "../../../stores";

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

  const NavIcon = {
    All: HomeIcon,
    Archived: ArchivedIcon,
  }[filter];

  return (
    <div
      className={`sidebar__top-nav-item ${mainFilter === filter ? "sidebar__top-nav-item--selected" : ""}`}
      onClick={() => setMainFilter(filter)}
    >
      <NavIcon />
      <span>{label}</span>
      {mainFilter === filter && <ArrowIcon width="15" height="15" />}
    </div>
  );
};
