import { useAuthStore } from "../../stores";

const HomePage = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
};

export default HomePage;
