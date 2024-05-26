import { useQuery } from "react-query";
import { getActivitiesForUser } from "../api/user-activities/get-activities-for-user";
import { Spinner, VStack } from "@chakra-ui/react";
import { ActivityLink } from "./activities/ActivityLink";
import { AddActivity } from "./activities/AddActivity";

export const Sidebar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["UserActivities", 1],
    queryFn: () => {
      return getActivitiesForUser({ userID: 1 });
    },
  });
  if (isLoading || !data?.activities) return <Spinner />;
  return (
    <VStack bg={"gray.400"} pt={4} overflowY={"auto"}>
      {data.activities.map((item) => (
        <ActivityLink {...item} key={item.ID} />
      ))}
      <AddActivity />
    </VStack>
  );
};
