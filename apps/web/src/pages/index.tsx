import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { LoginPage } from "./LoginPage";
import { PageLayout } from "../layouts/PageLayout";
import { ChatContainer } from "../components/chat/ChatContainer";
import { Activities } from "./Activites";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={"Hello from register page"} />
        <Route element={<ProtectedRoute />}>
          <Route element={<PageLayout />}>
            <Route path="/" element={<>{"router successfuly configured"}</>} />
            <Route path="/activities/:ID" element={<Activities />} />
            <Route path="/activities/:ID/chat" element={<ChatContainer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
