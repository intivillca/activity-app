import { Group, PostGroup } from "../../types/group";
import { api } from "../api";

export const postGroup = async (data: PostGroup) => {
  const { data: newData } = await api.post<Group>(`/groups`, data);
  return newData;
};
