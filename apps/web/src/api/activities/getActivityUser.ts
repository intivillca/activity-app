import { ActivityUser } from "../../types/activity-user";
import { ID } from "../../types/global";
import { api } from "../api";

export const getActivityUser = async (activityID: ID, userID: ID) => {
  const { data } = await api.get<ActivityUser>(
    `activities/${activityID}/members/${userID}`
  );
  return data;
};
