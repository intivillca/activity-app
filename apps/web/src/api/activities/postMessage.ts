import { FormMessage } from "../../types/message";
import { api } from "../api";

export const postActivityMessage = async (
  activityID: number,
  data: FormMessage
) => {
  await api.post(`/activities/${activityID}/message`, data);
};
