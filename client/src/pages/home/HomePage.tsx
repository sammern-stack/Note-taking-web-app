import { SideBar, NotesList } from "../../components/layout";
import { Button, Title } from "../../components/shared";
import { useAuthStore, useThemeStore } from "../../stores";
import "./HomePage.scss";

const HomePage = () => {
  const logout = useAuthStore((s) => s.logout);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className="home">
      <SideBar />

      <div className="home__content">
        <div className="home__header">
          <div className="home__header-left">
            <Title size="h1">Notes</Title>
          </div>

          <div className="home__header-right">
            <div className="home__search-bar">Search</div>
            <div className="home__profile">Profile</div>
          </div>
        </div>

        <div className="home__body">
          <div className="home__notes-content">
            <Button variant="primary">+ Create New Note</Button>

            <NotesList />
          </div>

          <div className="home__note-editor">
            <h1>Home</h1>
            <button onClick={() => logout()}>Log out</button>
            <button onClick={toggleTheme}>Toggle Theme</button>
          </div>
          <div className="home__note-actions">Actions</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
