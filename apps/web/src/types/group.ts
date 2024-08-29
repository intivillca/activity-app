import { UploadedFile, UploadImageData } from "./file";

export type GroupType = "PUBLIC" | "PRIVATE" | "LOCKED";

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

export type FormGroup = Omit<Group, "avatar"> & {
  avatar?: UploadImageData | UploadedFile;
};

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

export type PostGroup = Omit<Group, "name" | "avatar"> & {
  name: string;
  avatarId?: number;
  maxSize: number;
  type: GroupType;
};
