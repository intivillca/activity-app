import { Attachment } from "./attachment";
import { UserBaseData } from "./user";

export interface Message {
  ID: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  attachments?: Attachment[];
  sender: UserBaseData;
}
