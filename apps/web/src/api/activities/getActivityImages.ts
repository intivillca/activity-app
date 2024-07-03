import { Attachment } from "../../types/attachment";
import { ID } from "../../types/global";
import { api } from "../api";

export const getActivityImages = async (activityID: ID, cursor: any) => {
  const { data } = await api.get<{
    data: Attachment[];
    meta: { totalItems: number; nextCursor: number; prevCursor: number };
  }>(`/activities/${activityID}/images`, { params: { cursor } });
  return data;
};
