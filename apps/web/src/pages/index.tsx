import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { LoginPage } from "./LoginPage";
import { PageLayout } from "../layouts/PageLayout";
import { Activities } from "./Activites";
import { ActivitiesWrapper } from "../components/activities/ActivitesWrapper";
import { AddActivity } from "./AddActivity";
import { AuthProvider } from "../auth/AuthContext";
import { Invite } from "./Invite";
import { RegisterPage } from "./RegisterPage";
import { GlobalMessages } from "../components/global/GlobalMessages/GlobalMessages";
import { ActivityChat, GroupChat } from "../components/chat/ChatContainer";
import { GroupWrapper } from "../components/groups/GroupWrapper";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          element={
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          }
        >
          <Route element={<ProtectedRoute />}>
            <Route element={<PageLayout />}>
              <Route path="/" element={<GlobalMessages />} />
              <Route path="/invite/:ID" element={<Invite />} />
              <Route path="/activities/create" element={<AddActivity />} />
              <Route element={<ActivitiesWrapper />}>
                <Route path="/activities/:ID" element={<Activities />} />
                <Route path="/activities/:ID/chat" element={<ActivityChat />} />
                <Route element={<GroupWrapper />}>
                  <Route
                    path="/activities/:ID/group/:groupID"
                    element={<GroupChat />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
