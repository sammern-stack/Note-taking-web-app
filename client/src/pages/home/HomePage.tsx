import { useAuthStore, useThemeStore } from "../../stores";

const HomePage = () => {
  const logout = useAuthStore((s) => s.logout);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logout()}>Log out</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default HomePage;
