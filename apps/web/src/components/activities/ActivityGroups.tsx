import { useQuery } from "react-query";
import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { GroupCard } from "../groups/GroupCard";
import { AddGroup } from "../groups/AddGroup";
import { getActivityGroups } from "../../api/activities/getActivityGroups";

interface Props {
  ID: string | number;
}
export const ActivityGroups = ({ ID }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [`Activity-${ID}-Groups`],
    queryFn: () => {
      return getActivityGroups(ID);
    },
  });
  if (!data || isLoading) return <Spinner />;

  return (
    <Box flex="1 1 auto" overflowY="auto" w={"full"}>
      <SimpleGrid columns={[1, 1, 2, 3]} gridGap={4} w={"full"} p={4}>
        {data.groups.map((group) => (
          <GroupCard key={group.ID} {...group} />
        ))}
        <AddGroup />
      </SimpleGrid>
    </Box>
  );
};
