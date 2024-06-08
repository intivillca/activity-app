import { UploadedFile } from "./file";

type GroupType = "PUBLIC" | "PRIVATE" | "LOCKED";

export interface Group {
  ID: number;
  type: GroupType;
  name: string;
  description: string;
  maxSize: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  activityId: number;
  startDate: string;
  endDate: string;
  location: string;
  tags: string[];
  avatar?: UploadedFile;
}

export type GroupCard = Omit<
  Group,
  | "createdAt"
  | "updatedAt"
  | "activityId"
  | "deletedAt"
  | "location"
  | "startDate"
  | "endDate"
>;
