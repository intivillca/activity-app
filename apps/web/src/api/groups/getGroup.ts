import { ID } from "../../types/global";
import { Group } from "../../types/group";
import { api } from "../api";

export const getGroup = async (ID: ID) => {
  const { data } = await api.get<Group>(`/groups/${ID}`);
  return data;
};
