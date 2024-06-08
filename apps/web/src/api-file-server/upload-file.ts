import { UploadData } from "../types/file";
import { fileServerApi } from "./file-server-api";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await fileServerApi.post<UploadData>("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
