import { ID } from "../../types/global";
import { Message } from "../../types/message";
import { api } from "../api";

export const getActivityMessages = async (activityID: ID, cursor: any) => {
  const { data } = await api.get<{
    data: Message[];
    meta: { totalItems: number; nextCursor: number; prevCursor: number };
  }>(`/activities/${activityID}/message`, { params: { cursor } });
  return data;
};
