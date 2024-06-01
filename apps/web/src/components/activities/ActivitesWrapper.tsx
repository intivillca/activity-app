import { Spinner, VStack } from "@chakra-ui/react";
import { Outlet, useParams } from "react-router-dom";
import { ActivityProvider } from "./ActivityCtx";
import { useQuery } from "react-query";
import { getActivity } from "../../api/activities/getActivity";
import { ActivityHeader } from "./ActivityHeader";

export const ActivitiesWrapper = () => {
  const { ID } = useParams<{ ID: string }>();
  const { data } = useQuery({
    queryKey: ["Activity", ID],
    queryFn: () => {
      if (!ID) {
        throw Error("Missing ID");
      }
      return getActivity(ID);
    },
    enabled: !!ID,
  });

  if (!data) return <Spinner />;
  return (
    <ActivityProvider activity={data}>
      <VStack flex={"1 1 auto"}>
        <ActivityHeader />
        <Outlet />
      </VStack>
    </ActivityProvider>
  );
};
