import { useCallback } from "react";
import { QueryKey, useQueryClient } from "react-query";
import { useActivityEvents } from "../events/activity-events";
import { Activity } from "../types/activity";
import { UserActivities } from "../types/user";

export const useUpdateUserActivities = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  useActivityEvents("newActivity", ({ activity }) => {
    addNewActivity(activity);
  });
  const addNewActivity = useCallback(
    (activity: Activity) => {
      queryClient.setQueryData<UserActivities>(queryKey, (prev) => {
        if (!prev) {
          return { activities: [] };
        }
        return { activities: [...prev.activities, activity] };
      });
    },
    [queryClient, queryKey]
  );
};
