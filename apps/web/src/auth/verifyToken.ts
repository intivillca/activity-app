import * as jose from "jose";

export const verifyToken = async (token: string, key: jose.JWK) => {
  const jwks = await jose.importJWK({ ...key, alg: "RS256" });
  console.log({ token, key, jwks });

  if (token) {
    const verified = await jose.jwtVerify(token, jwks, {
      algorithms: ["RS256"],
    });
    return verified;
  }
  return false;
};
