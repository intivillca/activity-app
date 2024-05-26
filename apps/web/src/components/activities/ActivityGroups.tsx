import { useQuery } from "react-query";
import { groups } from "../groups/testdata";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { GroupCard } from "../groups/GroupCard";
import { AddGroup } from "../groups/AddGroup";

interface Props {
  ID: string | number;
}
export const ActivityGroups = ({ ID }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [`Activity-${ID}-Groups`],
    queryFn: () => {
      return groups;
    },
  });
  if (!data || isLoading) return <Spinner />;
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} gridGap={4} w={"full"}>
      {data.map((group) => (
        <GroupCard key={group.ID} {...group} />
      ))}
      <AddGroup />
    </SimpleGrid>
  );
};
