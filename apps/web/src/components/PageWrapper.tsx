import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      overflow={"hidden"}
    >
      {children}
    </Flex>
  );
};
