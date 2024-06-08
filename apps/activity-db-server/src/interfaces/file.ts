export interface File {
  type: "image" | "file";
  fileName: string;
  mimeType: string;
  checksum: string;
  fileSize: number;
  original: string;
}
