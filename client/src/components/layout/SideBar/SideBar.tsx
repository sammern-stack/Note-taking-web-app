import { SiteLogo, Title } from "../../shared";
import TagIcon from "../../../assets/images/icon-tag.svg?react";
import "./SideBar.scss";

export const SideBar = () => {
  return (
    <div className="home__sidebar sidebar">
      <SiteLogo wrapper="sidebar__site-icon" />

      <div className="sidebar__content">
        <div className="sidebar__top-nav">
          <div className="sidebar__top-nav-item">
            <span>I</span>
            <span>All Notes</span>
            <span>A</span>
          </div>

          <div className="sidebar__top-nav-item">
            <span>I</span>
            Archived Notes
          </div>
        </div>

        <div className="sidebar__divider"></div>

        <Title size="h3" className="sidebar__tags-title">
          Tags
        </Title>

        <div className="sidebar__tags-list">
          <div className="sidebar__tag-item">
            <TagIcon width="20" height="20" />
            Tag-1
          </div>
          <div className="sidebar__tag-item">
            <TagIcon width="20" height="20" />
            Tag-2
          </div>
          <div className="sidebar__tag-item">
            <TagIcon width="20" height="20" />
            Tag-3
          </div>
        </div>
      </div>
    </div>
  );
};
