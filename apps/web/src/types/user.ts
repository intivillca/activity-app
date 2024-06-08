import { UploadedFile } from "./file";

export interface UserBaseData {
  ID: number;
  username: string;
  avatar?: UploadedFile;
}
