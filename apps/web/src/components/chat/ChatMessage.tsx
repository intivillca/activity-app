import { Avatar, Box, HStack, VStack } from "@chakra-ui/react";
import { Message } from "../../types/message";

export const ChatMessage = ({
  attachments,
  content,
  sender,
  updatedAt,
}: Pick<Message, "content" | "sender" | "updatedAt" | "attachments">) => {
  console.log(attachments);
  return (
    <HStack w="full">
      <Avatar name={sender.username} flex={"0 1 auto"} />
      <VStack flex={"1 1 auto"} alignItems={"flex-start"}>
        <HStack>
          <Box fontWeight={"bold"}>{sender.username}</Box>
          <Box fontSize={"xs"}>{updatedAt}</Box>
        </HStack>
        <Box>{content}</Box>
      </VStack>
    </HStack>
  );
};
