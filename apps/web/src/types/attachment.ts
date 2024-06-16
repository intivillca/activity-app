export interface Attachment {
  ID: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  src: string;
  mimeType: string;
  size: number;
  checksum: string;
  fileName: string;
  type: "IMAGE" | "FILE";
}
