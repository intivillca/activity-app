import { ID } from "../../types/global";
import { GroupUser } from "../../types/group-user";
import { api } from "../api";

export const getGroupUser = async (groupID: ID, userID: ID) => {
  const { data } = await api.get<GroupUser>(
    `group/${groupID}/members/${userID}`
  );
  return data;
};
