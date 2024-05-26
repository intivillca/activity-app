import { Box, Flex, VStack } from "@chakra-ui/react";
import { messages } from "./testdata";
import { ChatMessage } from "./ChatMessage";

export const ChatContainer = () => {
  return (
    <VStack flex={"1 1 auto"} spacing={0} overflow={"hidden"}>
      <Flex
        p={4}
        flex={"0 1 64px"}
        bg={"gray.700"}
        w="full"
        shadow={"md"}
        color={"white"}
        fontWeight={"bold"}
        fontSize={"lg"}
      >
        {"Header"}
      </Flex>
      <VStack
        spacing={4}
        flex={"1 1 auto"}
        bg={"gray.600"}
        w="full"
        overflowY={"scroll"}
        padding={4}
      >
        {messages.map((message) => (
          <ChatMessage {...message} key={message.ID} />
        ))}
      </VStack>
      <Box flex={"0 1 64px"} bg={"red"} w="full">
        {"Text input"}
      </Box>
    </VStack>
  );
};
