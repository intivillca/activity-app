import { Activity } from "./activity";
import { UploadedFile } from "./file";

export interface UserBaseData {
  ID: number;
  username: string;
  avatar?: UploadedFile;
}

export interface UserActivities {
  activities: Activity[];
}
