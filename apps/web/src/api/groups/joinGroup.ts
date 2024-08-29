import { ID } from "../../types/global";
import { GroupUser } from "../../types/group-user";
import { api } from "../api";

export const joinGroup = async (groupID: ID) => {
  const { data } = await api.get<GroupUser | undefined>(
    `group/${groupID}/join`
  );
  return data;
};
