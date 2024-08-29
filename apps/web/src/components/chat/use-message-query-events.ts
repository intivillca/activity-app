import { InfiniteData, QueryKey, useQueryClient } from "react-query";
import { useSocketEvents } from "../../socket/socket";
import { Message } from "../../socket/types";

export const useMessageQueryEvents = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  useSocketEvents("msgSend", (newMessage) => {
    queryClient.setQueryData<
      InfiniteData<{
        data: Message[];
        meta: {
          totalItems: number;
          nextCursor: number | null;
          prevCursor: number | null;
        };
      }>
    >(queryKey, (prev) => {
      console.log(prev);

      if (!prev) {
        return {
          pages: [
            {
              data: [newMessage.message],
              meta: { totalItems: 1, nextCursor: null, prevCursor: null },
            },
          ],
          pageParams: [null],
        };
      }

      // Assuming newMessage should be added to the first page
      const updatedPages = prev.pages.map((page, index) => {
        if (index === 0) {
          return {
            ...page,
            data: [...page.data, newMessage.message],
            meta: { ...page.meta, totalItems: page.meta.totalItems + 1 },
          };
        }
        return page;
      });

      return { ...prev, pages: updatedPages };
    });
  });
};
