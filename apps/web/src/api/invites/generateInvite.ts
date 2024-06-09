import { Invite } from "../../types/invite";
import { api } from "../api";

export const generateInvite = async (data: {
  activityID: number;
  groupID?: number;
}) => {
  const { data: newData } = await api.post<Invite>("/invites", data);
  return newData;
};
