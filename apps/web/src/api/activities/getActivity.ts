import { Activity } from "../../types/activity";
import { ID } from "../../types/global";
import { api } from "../api";

export const getActivity = async (ID: ID) => {
  const { data } = await api.get<Activity>(`/activities/${ID}`);
  return data;
};
