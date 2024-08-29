import { useCallback } from "react";
import { QueryKey, useQueryClient } from "react-query";
import { useGroupEvents } from "../events/group-events";
import { Group } from "../types/group";

export const useUpdateGroups = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  useGroupEvents("newGroup", ({ Group }) => {
    addNewGroup(Group);
  });
  const addNewGroup = useCallback(
    (group: Group) => {
      queryClient.setQueryData<{ groups: Group[] }>(queryKey, (prev) => {
        if (!prev) {
          return { groups: [] };
        }
        return { groups: [...prev.groups, group] };
      });
    },
    [queryClient, queryKey]
  );
};
