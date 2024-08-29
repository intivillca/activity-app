import { GroupRole } from "./group-role";
import { UserBaseData } from "./user";

export interface GroupUser {
  ID: number;
  userId: number;
  groupId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  groupRole: GroupRole;
}
export interface GroupUserWithUserInfo extends Omit<GroupUser, "userId"> {
  user: UserBaseData;
}
