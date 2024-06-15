import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useRef } from "react";
import { useActivityProvider } from "../activities/ActivityCtx";
import { handleJoinRoom, handleLeaveRoom } from "../../socket/socket-events";
import { ChatInput } from "./ChatInput";
import { useQuery } from "react-query";
import { Message } from "../../socket/types";
import { ChatMessage } from "./ChatMessage";
import { useMessageQueryEvents } from "./use-message-query-events";

export const ChatContainer = () => {
  const alreadyScrolled = useRef<boolean>(false);
  const {
    activity,
    activityUser: { userId },
  } = useActivityProvider();
  const roomId = useMemo(() => activity.ID, [activity.ID]);
  const roomType: "activity" = useMemo(() => "activity", []);
  const { data } = useQuery({
    queryFn: () => {
      return [] as Message[];
    },
    queryKey: ["Messages", roomType, roomId],
  });
  useEffect(() => {
    handleJoinRoom({ roomId, roomType });
    return () => {
      handleLeaveRoom({ roomId, roomType });
    };
  }, [roomId, roomType]);
  useMessageQueryEvents(["Messages", roomType, roomId]);

  return (
    <VStack flex={"1 1 auto"} spacing={0} overflow={"hidden"} w="full">
      <VStack
        ref={(e) => {
          if (!alreadyScrolled.current && e) {
            e.scrollTop = e.scrollHeight;
            alreadyScrolled.current = true;
          }
        }}
        spacing={4}
        flex={"1 1 auto"}
        h="full"
        w="full"
        overflowY={"scroll"}
        padding={4}
      >
        {data?.map((item) => (
          <ChatMessage
            content={item.content}
            sender={{ ID: userId, username: "", avatar: undefined }}
            updatedAt={""}
          />
        ))}
      </VStack>
      <Box flex={"1 0 80px"} w="full" display={"flex"} flexDir={"column"}>
        <ChatInput />
      </Box>
    </VStack>
  );
};
