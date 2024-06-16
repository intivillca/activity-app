import { Avatar, Box, HStack, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { getAvatar } from "../../api-file-server/get-avatar";
import { Attachment } from "../../types/attachment";
import { Message } from "../../types/message";
import { useRefreshDate } from "../../utils/use-refresh-date";
import { ChatAttachments } from "./ChatAttachments";
import { ChatImages } from "./ChatImages";

interface SplitAttachments {
  files: Attachment[];
  images: Attachment[];
}
export const ChatMessage = ({
  attachments,
  content,
  sender,
  updatedAt,
}: Message) => {
  const splitAttachments = useMemo(() => {
    return attachments?.reduce<SplitAttachments>(
      (all, current) => {
        if (current.type === "IMAGE") {
          return { ...all, images: [...all.images, current] };
        }
        return { ...all, files: [...all.files, current] };
      },
      {
        files: [],
        images: [],
      }
    );
  }, [attachments]);
  return (
    <VStack w={"full"}>
      <HStack w="full">
        <Avatar
          name={sender.username}
          src={getAvatar(sender.avatar?.src)}
          flex={"0 1 auto"}
        />
        <VStack flex={"1 1 auto"} alignItems={"flex-start"}>
          <HStack>
            <Box fontWeight={"bold"}>{sender.username}</Box>
            <ChatMessageDate updatedAt={updatedAt} />
          </HStack>
          <Box>{content}</Box>
        </VStack>
      </HStack>
      {splitAttachments?.images && (
        <ChatImages images={splitAttachments.images} />
      )}
      {splitAttachments?.files && (
        <ChatAttachments files={splitAttachments.files} />
      )}
    </VStack>
  );
};

export const ChatMessageDate = ({ updatedAt }: { updatedAt: string }) => {
  const { descriptiveDate } = useRefreshDate(updatedAt);

  return <Box fontSize={"xs"}>{descriptiveDate}</Box>;
};
