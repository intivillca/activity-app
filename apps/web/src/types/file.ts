export interface UploadBaseData {
  type: string;
  fileName: string;
  mimeType: string;
  checksum: string;
  fileSize: number;
  original: string;
}

export interface UploadImageData extends UploadBaseData {
  type: "image";
  variants: {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    "extra-large": string;
  };
}

export interface UploadFileData extends UploadBaseData {
  type: "file";
}
export type UploadData = UploadImageData | UploadFileData;

export type FileType = "IMAGE" | "FILE";
export interface UploadedFile {
  ID: number;
  type: FileType;
  src: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  mimeType: string;
  size: number;
  fileName: string;
  checksum: string;
  uploadedById: number;
  attachedToId?: number | null;
}
