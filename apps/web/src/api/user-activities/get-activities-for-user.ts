import { Activity } from "../../types/activity";
import { api } from "../api";

interface Params {
  userID: number | string;
}
interface ApiResponse {
  activities: Activity[];
}

export const getActivitiesForUser = async ({
  userID,
}: Params): Promise<ApiResponse> => {
  const { data } = await api.get<ApiResponse>(`/user-activities/${userID}`);
  return data;
};
