import { Outlet } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { Grid } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

export const PageLayout = () => {
  return (
    <PageWrapper>
      <Grid
        templateColumns={"64px 1fr"}
        flex={"1 1 auto"}
        width={"full"}
        overflow={"hidden"}
      >
        <Sidebar />
        <Outlet />
      </Grid>
    </PageWrapper>
  );
};
