import { UploadedFile } from "./file";

export interface SimpleActivityOrGroup {
  ID: number;
  name: string;
  avatar?: UploadedFile;
}

export interface GlobalMessage {
  ID: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  senderID: number;
  group: SimpleActivityOrGroup | null;
  activity: SimpleActivityOrGroup | null;
}
