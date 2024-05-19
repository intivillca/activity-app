import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

interface Props {
  redirectPath?: string;
}
export const ProtectedRoute = ({ redirectPath = "/login" }: Props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
