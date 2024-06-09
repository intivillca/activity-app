import { UserActivities } from "../../types/user";
import { api } from "../api";

interface Params {
  userID: number | string;
}

export const getActivitiesForUser = async ({
  userID,
}: Params): Promise<UserActivities> => {
  const { data } = await api.get<UserActivities>(`/user-activities/${userID}`);
  return data;
};
