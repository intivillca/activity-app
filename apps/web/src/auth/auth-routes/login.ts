import { LoginRequestData, LoginResponseData } from "../../types/login";
import { authApi } from "../auth-server";

export const login = async (
  data: LoginRequestData
): Promise<LoginResponseData> => {
  const { data: responseData } = await authApi.post<LoginResponseData>(
    "/login",
    data
  );

  return responseData;
};
