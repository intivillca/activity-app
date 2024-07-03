import { GlobalMessage } from "../../types/global-message";
import { api } from "../api";

export const getGlobalMessages = async (cursor: any) => {
  const { data } = await api.get<{
    data: GlobalMessage[];
    meta: { totalItems: number; nextCursor: number; prevCursor: number };
  }>("/messages", { params: { cursor } });
  return data;
};
