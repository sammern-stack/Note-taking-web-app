import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores";

export const ProtectedRoute = () => {
  const { user, status } = useAuthStore();
  const location = useLocation();

  if (status === "idle" || status === "loading") return null;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
};
