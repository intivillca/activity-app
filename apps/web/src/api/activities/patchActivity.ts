import { PatchActivity } from "../../types/activity";
import { ID } from "../../types/global";
import { api } from "../api";

interface Params {
  activityID: ID;
  data: PatchActivity;
}

export const patchActivity = async ({ activityID, data }: Params) => {
  const { data: newData } = await api.patch(`/activities/${activityID}`, data);
  return newData;
};
