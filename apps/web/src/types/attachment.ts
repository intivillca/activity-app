export interface Attachment {
  ID: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  src: string;
  mine: string;
  messageID: number;
}
