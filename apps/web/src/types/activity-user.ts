import { GroupRole } from "./group-role";
import { UserBaseData } from "./user";

export interface ActivityUser {
  ID: number;
  userId: number;
  activityId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  groupRole: GroupRole;
}

export interface ActivityUserWithMember extends Omit<ActivityUser, "userID"> {
  user: UserBaseData;
}
