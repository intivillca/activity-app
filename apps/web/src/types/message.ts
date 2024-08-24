import { Attachment } from "./attachment";
import { UploadData } from "./file";
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

export type FormMessage = Pick<Message, "content"> & {
  attachments: UploadData[];
  messageID?: number;
};
