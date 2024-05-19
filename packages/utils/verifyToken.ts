import { jwk2pem, RSA_JWK } from "pem-jwk";
import jwt from "jsonwebtoken";

export const verifyToken = (token: string, key: RSA_JWK) => {
  const pubKey = jwk2pem(key);
  const isVerified = jwt.verify(token, pubKey);
  return isVerified;
};
