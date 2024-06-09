export interface Invite {
  ID: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  groupId: number | null;
  activityID: number;
  createdByUserID: number;
}
