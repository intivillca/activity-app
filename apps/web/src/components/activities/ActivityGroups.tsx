import { useQuery } from "react-query";
import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { GroupCard } from "../groups/GroupCard";
import { getActivityGroups } from "../../api/activities/getActivityGroups";
import { GroupCreateModalTrigger } from "../groups/Modal/ModalTrigger";
import { useMemo } from "react";
import { useUpdateGroups } from "../../utils/use-update-groups";

interface Props {
  ID: string | number;
}
export const ActivityGroups = ({ ID }: Props) => {
  const queryKey = useMemo(() => [`Activity-${ID}-Groups`], [ID]);
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      return getActivityGroups(ID);
    },
  });
  useUpdateGroups(queryKey);
  if (!data || isLoading) return <Spinner />;

  return (
    <Box flex="1 1 auto" overflowY="auto" w={"full"}>
      <SimpleGrid columns={[1, 1, 2, 3]} gridGap={4} w={"full"} p={4}>
        {data.groups.map((group) => (
          <GroupCard key={group.ID} {...group} />
        ))}
        <GroupCreateModalTrigger />
      </SimpleGrid>
    </Box>
  );
};
