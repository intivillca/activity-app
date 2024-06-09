import { Activity } from "../../types/activity";
import { Group } from "../../types/group";
import { api } from "../api";

export const handleInvite = async (id: string) => {
  const { data } = await api.get<{
    activity: Activity;
    group?: Group;
  }>(`/invites/${id}`);
  return data;
};
