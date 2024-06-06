import { Box } from "@chakra-ui/react";
import { ActivityInfoDrawerTrigger } from "./Info/ActivityInfoDrawerTrigger";
import { ActivityMemberDrawerTrigger } from "./Members/MemberDrawerTrigger";

export const ActivityHeader = () => {
  return (
    <Box
      h={"72px"}
      flex={"0 1 72px"}
      bg={"gray.700"}
      w="full"
      color={"white"}
      p={4}
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      fontSize={"xl"}
    >
      <ActivityInfoDrawerTrigger />
      <ActivityMemberDrawerTrigger />
    </Box>
  );
};
