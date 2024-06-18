import {
  RegisterRequestData,
  RegisterResponseData,
} from "../../types/register";
import { authApi } from "../auth-server";

export const registerUser = async (
  data: RegisterRequestData
): Promise<RegisterResponseData> => {
  const { data: responseData } = await authApi.post<RegisterResponseData>(
    "/register",
    data
  );

  return responseData;
};
