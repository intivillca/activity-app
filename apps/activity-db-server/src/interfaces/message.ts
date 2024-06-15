import { File } from "./file";

export interface PostActivityMessage {
  activityId: number;
  senderId: number;
  content: string;
  attachments: File[];
}
