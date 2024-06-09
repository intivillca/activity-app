import { Activity } from "../types/activity";
import mitt from "mitt";
import { createUseMitt } from "../utils/use-mitt";
export interface NewActivity {
  activity: Activity;
}
export type ActivityEvents = {
  newActivity: NewActivity;
};

export const activityEvents = mitt<ActivityEvents>();

export const useActivityEvents = createUseMitt(activityEvents);

export const handleNewActivity = (activity: Activity) => {
  activityEvents.emit("newActivity", { activity });
};
