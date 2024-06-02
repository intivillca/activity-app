import { Image } from "./image";

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
  img?: Image;
}

export type FormActivity = Omit<Activity, "img"> & { img?: File };
