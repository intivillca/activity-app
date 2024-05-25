import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

interface Props {
  redirectPath?: string;
}
export const ProtectedRoute = ({ redirectPath = "/login" }: Props) => {
  const { isAuthenticated } = useAuth();

  console.log("prot route", { isAuthenticated });

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
