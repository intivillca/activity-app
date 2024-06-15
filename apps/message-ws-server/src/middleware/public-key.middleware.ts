// publicKeyMiddleware.ts

import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { RSA_JWK } from "pem-jwk";

let publicKeys: RSA_JWK | null = null;

async function fetchPublicKeys() {
  try {
    const response = await axios.get<RSA_JWK>(
      `${process.env.AUTH_SEVER_URL}/pubkey`
    );
    publicKeys = response.data;
  } catch (error) {
    console.error("Error fetching public keys:", error);
  }
}

export async function publicKeyMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!publicKeys) {
    await fetchPublicKeys();
  }
  next();
}

// Function to get the public keys
export function getPublicKeys() {
  return publicKeys;
}
