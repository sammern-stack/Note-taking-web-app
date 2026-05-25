//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useNotesStore } from "../../../stores";

import { SiteLogo, Title } from "../../shared";
import { MainNavItem } from "./MainNavItem";
import { TagItem } from "./TagItem";

import "./SideBar.scss";

//—————————————————————————————————————————————————————————————————
// Component
//—————————————————————————————————————————————————————————————————

export const SideBar = () => {
  const tags = useNotesStore((s) => s.tags);

  return (
    <div className="home__sidebar sidebar">
      <SiteLogo wrapper="sidebar__site-icon" />

      <div className="sidebar__content">
        <div className="sidebar__top-nav">
          <MainNavItem label="All Notes" filter="All" />
          <MainNavItem label="Archived Notes" filter="Archived" />
        </div>

        <div className="sidebar__divider"></div>

        <Title size="h3" className="sidebar__tags-title">
          Tags
        </Title>

        <div className="sidebar__tags-list">
          {tags.map((tag) => (
            <TagItem tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};
