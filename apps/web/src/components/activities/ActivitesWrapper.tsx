import { Spinner, VStack } from "@chakra-ui/react";
import { Outlet, useParams } from "react-router-dom";
import { ActivityProvider } from "./ActivityCtx";
import { useQuery } from "react-query";
import { getActivity } from "../../api/activities/getActivity";
import { ActivityHeader } from "./ActivityHeader";
import { useAuth } from "../../auth/AuthContext";
import { getActivityUser } from "../../api/activities/getActivityUser";

export const ActivitiesWrapper = () => {
  const { ID } = useParams<{ ID: string }>();
  const { userID } = useAuth();
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

  const { data: activityUser } = useQuery({
    queryKey: ["ActivityUser", ID, userID],
    queryFn: () => {
      if (!ID) {
        throw Error("Missing ID");
      }
      return getActivityUser(ID, userID);
    },
    enabled: !!data,
  });

  if (!data || !activityUser) return <Spinner />;
  return (
    <ActivityProvider activity={data} activityUser={activityUser}>
      <VStack spacing={0} overflow={"hidden"}>
        <ActivityHeader />
        <Outlet />
      </VStack>
    </ActivityProvider>
  );
};
