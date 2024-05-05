import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { pem2jwk } from "pem-jwk";

async function pubkeyController(_req: Request, res: Response) {
  try {
    const certsDir = path.join(process.cwd(), "certs");
    const publicKeyPath = path.join(certsDir, "public.pem");
    const publicKey = fs.readFileSync(publicKeyPath, "utf8");

    const jwkPublicKey = pem2jwk(publicKey);
    return res.json(jwkPublicKey);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default pubkeyController;
