import { QueryKey, useQueryClient } from "react-query";
import { useSocketEvents } from "../../socket/socket";
import { Message } from "../../socket/types";

export const useMessageQueryEvents = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  useSocketEvents("msgSend", (data) => {
    queryClient.setQueryData<Message[]>(queryKey, (prev) => {
      if (!prev) {
        return [];
      }
      return [data.message, ...prev];
    });
  });
};
