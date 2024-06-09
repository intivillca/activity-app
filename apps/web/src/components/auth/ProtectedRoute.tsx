import { Navigate, Outlet } from "react-router-dom";

interface Props {
  redirectPath?: string;
}
export const ProtectedRoute = ({ redirectPath = "/login" }: Props) => {
  const token = window.localStorage.getItem("authToken") ?? "";

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
