import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { LoginPage } from "./LoginPage";
import { PageLayout } from "../layouts/PageLayout";
import { ChatContainer } from "../components/chat/ChatContainer";
import { Activities } from "./Activites";
import { ActivitiesWrapper } from "../components/activities/ActivitesWrapper";
import { AddActivity } from "./AddActivity";
import { AuthProvider } from "../auth/AuthContext";
import { Invite } from "./Invite";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={"Hello from register page"} />
        <Route
          element={
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          }
        >
          <Route element={<ProtectedRoute />}>
            <Route element={<PageLayout />}>
              <Route
                path="/"
                element={<>{"router successfuly configured"}</>}
              />
              <Route path="/invite/:ID" element={<Invite />} />
              <Route path="/activities/create" element={<AddActivity />} />
              <Route element={<ActivitiesWrapper />}>
                <Route path="/activities/:ID" element={<Activities />} />
                <Route
                  path="/activities/:ID/chat"
                  element={<ChatContainer />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
