import { Box } from "@chakra-ui/react";

export const ActivityHeader = () => {
  return (
    <Box
      h={"64px"}
      flex={"0 1 64px"}
      bg={"gray.700"}
      w="full"
      color={"white"}
      p={4}
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      fontSize={"xl"}
    >
      {"Header"}
    </Box>
  );
};
