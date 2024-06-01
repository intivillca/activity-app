import { ID } from "../../types/global";
import { Group } from "../../types/group";
import { api } from "../api";

export const getActivityGroups = async (activityID: ID) => {
  const { data } = await api.get<{ groups: Group[] }>(
    `/activities/${activityID}/groups`
  );
  return data;
};
