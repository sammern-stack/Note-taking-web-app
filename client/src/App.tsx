import { lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useInitApp } from "./hooks";

import { ProtectedRoute, AppLoader } from "./components/shared";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));

export const App = () => {
  const { isAppLoading } = useInitApp();
  if (isAppLoading) return <AppLoader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
