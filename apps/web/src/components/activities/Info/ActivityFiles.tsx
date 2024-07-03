import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { getActivityImages } from "../../../api/activities/getActivityImages";
import { useActivityProvider } from "../ActivityCtx";
import { VStack } from "@chakra-ui/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./style.css";
import { ChatAttachment } from "../../chat/ChatAttachments";
import { getActivityFiles } from "../../../api/activities/getActivitiesFiles";

export const ActivityFiles = () => {
  const { activity } = useActivityProvider();
  const queryKey = useMemo(
    () => ["Activity", activity.ID, "files"],
    [activity.ID]
  );
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return getActivityFiles(activity.ID, pageParam);
    },
    getNextPageParam: ({ meta: { nextCursor } }) => nextCursor,
    getPreviousPageParam: ({ meta: { prevCursor } }) => prevCursor,
    queryKey,
  });

  const items = useMemo(() => {
    return data?.pages.map((page) => page.data).flat();
  }, [data?.pages]);

  return (
    <VStack>
      {items?.map((file) => <ChatAttachment key={file.ID} {...file} />)}
    </VStack>
  );
};
