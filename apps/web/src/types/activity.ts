import { UploadedFile } from "./file";

export interface Activity {
  ID: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  startDate: string | null;
  endDate: string | null;
  location: string | undefined;
  tags: string[];
  avatar?: UploadedFile;
}

export type FormActivity = Omit<Activity, "avatar"> & {
  avatar?: File | string;
};

export type PatchActivity = Partial<
  Omit<Activity, "createdAt" | "updatedAt" | "deletedAt" | "img">
>;

export type PostActivity = Partial<
  Omit<Activity, "name" | "avatar"> & { name: string; fileId?: number }
>;
