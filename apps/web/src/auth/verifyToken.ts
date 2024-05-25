import * as jose from "jose";

export const verifyToken = async (token: string, key: jose.JWK) => {
  const jwks = await jose.importJWK({ ...key, alg: "RS256" });

  const verified = await jose.jwtVerify<{
    username: string;
    iat: number;
    exp: number;
  }>(token, jwks, {
    algorithms: ["RS256"],
  });
  return verified;
};
