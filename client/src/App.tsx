import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";

function App() {
  const { initializeAuth, status } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (status === "idle" || status === "loading") {
    return <div className="app-loader">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/notes" element={<NotesPage />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
