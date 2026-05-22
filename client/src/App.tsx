import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useInitApp } from "./hooks";

import { HomePage, SettingsPage, LoginPage } from "./pages";

import { ProtectedRoute } from "./components/shared";

function App() {
  const { isAppLoading } = useInitApp();
  if (isAppLoading) return <div className="app-loader">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
