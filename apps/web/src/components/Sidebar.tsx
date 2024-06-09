import { useQuery } from "react-query";
import { getActivitiesForUser } from "../api/user-activities/get-activities-for-user";
import { Divider, Spinner, VStack } from "@chakra-ui/react";
import { ActivityLink } from "./activities/ActivityLink";
import { UserGroupsButton } from "./groups/UserGroupsButton";
import { useAuth } from "../auth/AuthContext";
import { ActivityCreateModalTrigger } from "./activities/Modal/ModalTrigger";
import { useUpdateUserActivities } from "../utils/use-update-user-activites";
import { useMemo } from "react";

export const Sidebar = () => {
  const { userID } = useAuth();
  const queryKey = useMemo(() => ["UserActivities", userID], [userID]);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      return getActivitiesForUser({ userID });
    },
  });
  useUpdateUserActivities(queryKey);

  if (isLoading || !data?.activities) return <Spinner />;
  return (
    <VStack bg={"gray.400"} pt={4} overflowY={"auto"}>
      <UserGroupsButton />
      <Divider />
      {data.activities.map((item) => (
        <ActivityLink {...item} key={item.ID} />
      ))}
      <ActivityCreateModalTrigger />
    </VStack>
  );
};
