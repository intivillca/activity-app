import { Box, VStack } from "@chakra-ui/react";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useActivityProvider } from "../activities/ActivityCtx";
import { handleJoinRoom, handleLeaveRoom } from "../../socket/socket-events";
import { ChatInput } from "./ChatInput";
import { useInfiniteQuery } from "react-query";
import { ChatMessage } from "./ChatMessage";
import { useMessageQueryEvents } from "./use-message-query-events";
import { getActivityMessages } from "../../api/activities/getActivityMessage";
import { useChangeEffect } from "../../utils/use-change-effect";

export const ChatContainer = () => {
  const alreadyScrolled = useRef<boolean>(false);
  const chatContainerElementRef = useRef<HTMLDivElement>();
  const chatContainerRef = useCallback((e: HTMLDivElement) => {
    if (!alreadyScrolled.current && e) {
      e.scrollTop = e.scrollHeight;
      alreadyScrolled.current = true;
    }

    chatContainerElementRef.current = e;
  }, []);
  const { activity } = useActivityProvider();
  const roomId = useMemo(() => activity.ID, [activity.ID]);
  const roomType: "activity" = useMemo(() => "activity", []);
  const queryKey = useMemo(
    () => ["Messages", roomType, roomId],
    [roomId, roomType]
  );
  const handleShouldScroll = useCallback(
    (chatContainerRef: MutableRefObject<HTMLDivElement | undefined>) => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        if (distanceFromBottom < 300) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }
    },
    []
  );

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return getActivityMessages(activity.ID, pageParam);
    },
    getNextPageParam: ({ meta: { nextCursor } }) => nextCursor,
    getPreviousPageParam: ({ meta: { prevCursor } }) => prevCursor,
    queryKey,
  });

  const items = useMemo(() => {
    return data?.pages.map((page) => page.data).flat();
  }, [data?.pages]);

  useEffect(() => {
    handleJoinRoom({ roomId, roomType });
    return () => {
      handleLeaveRoom({ roomId, roomType });
    };
  }, [roomId, roomType]);

  useMessageQueryEvents(queryKey);

  useChangeEffect(
    items?.length,
    () => {
      handleShouldScroll(chatContainerElementRef);
    },
    [handleShouldScroll]
  );

  return (
    <VStack flex={"1 1 auto"} spacing={0} overflow={"hidden"} w="full">
      <VStack
        ref={chatContainerRef}
        spacing={4}
        flex={"1 1 auto"}
        h="full"
        w="full"
        overflowY={"scroll"}
        padding={4}
        onScroll={(e) => {
          if (e.currentTarget.scrollTop === 0 && hasNextPage) {
            fetchNextPage();
          }
        }}
      >
        {items?.map((item) => <ChatMessage {...item} />)}
      </VStack>
      <Box flex={"1 0 80px"} w="full" display={"flex"} flexDir={"column"}>
        <ChatInput />
      </Box>
    </VStack>
  );
};
