import { PostActivity } from "../../types/activity";
import { api } from "../api";

export const postActivity = async (data: PostActivity) => {
  const { data: newData } = await api.post(`/activities`, data);
  return newData;
};
