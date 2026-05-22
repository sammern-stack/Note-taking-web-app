import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

export const ProtectedRoute = () => {
  const { user, status } = useAuthStore();
  const location = useLocation();

  if (status === "idle" || status === "loading") return null;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
