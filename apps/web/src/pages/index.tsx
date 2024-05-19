import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { LoginPage } from "./LoginPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={"Hello from register page"} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<>{"router successfuly configured"}</>} />
          <Route path="/activities" element={<>{"Yo from activities"}</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
