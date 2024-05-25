import { Outlet } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";

export const PageLayout = () => {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
};
