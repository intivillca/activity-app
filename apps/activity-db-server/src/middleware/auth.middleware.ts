// authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getPublicKeys } from "./public-key.middleware";
import { jwk2pem } from "pem-jwk";

interface JWTPayload {
  userID: string;
  iat: number;
  exp: number;
}
// Middleware to verify JWT tokens using public keys
export function authMiddleware(
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];
  const publicKeys = getPublicKeys();

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing Authorization header" });
  }

  if (!publicKeys) {
    return res.status(500).json({ error: "Unable to fetch public keys" });
  }

  try {
    const pem = jwk2pem(publicKeys);
    const decodedToken = jwt.verify(token, pem, {
      algorithms: ["RS256"],
    }) as JWTPayload;
    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ error: "Unauthorized: Token has expired" });
    }
    if (decodedToken) {
      res.locals.userID = decodedToken.userID;
      next();
    }
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }
}
