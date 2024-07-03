import { Box } from "@chakra-ui/react";
import { useRefreshDate } from "../../../utils/use-refresh-date";

export const ChatMessageDate = ({ updatedAt }: { updatedAt: string }) => {
  const { descriptiveDate } = useRefreshDate(updatedAt);

  return <Box fontSize={"xs"}>{descriptiveDate}</Box>;
};
