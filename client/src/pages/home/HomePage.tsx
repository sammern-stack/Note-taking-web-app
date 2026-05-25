import { SideBar, NotesList } from "../../components/layout";
import { useAuthStore, useThemeStore } from "../../stores";
import "./HomePage.scss";

const HomePage = () => {
  const logout = useAuthStore((s) => s.logout);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className="home">
      <SideBar />

      <div className="home__content">
        <div className="home__header">Header</div>

        <div className="home__body">
          <div className="home__notes-content">
            <div className="home__add-note">Add new note</div>
            <NotesList />
          </div>
          <div className="home__note-editor">
            Editor
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
