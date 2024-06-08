import { UploadData } from "../../types/file";
import { api } from "../api";

export const createFile = async (data: UploadData) => {
  const { data: newData } = await api.post<{ fileId: number }>("/files", data);
  return newData;
};
