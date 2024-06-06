import { ActivityUserWithMember } from "../../types/activity-user";
import { ID } from "../../types/global";
import { api } from "../api";

export const getActivityUsers = async (activityID: ID) => {
  const { data } = await api.get<{ activityMembers: ActivityUserWithMember[] }>(
    `activities/${activityID}/members`
  );
  return data;
};
