import { JWK } from "jose";
import { authApi } from "../auth-server";

export const getPubkey = async (): Promise<JWK> => {
  const { data: responseData } = await authApi.get<JWK>("/pubkey");

  return responseData;
};
