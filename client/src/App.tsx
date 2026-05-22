import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useInitApp } from "./hooks";

import { LoginPage } from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";

import { ProtectedRoute } from "./components/shared/ProtectedRoute";

function App() {
  const { isAppLoading } = useInitApp();
  if (isAppLoading) return <div className="app-loader">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
