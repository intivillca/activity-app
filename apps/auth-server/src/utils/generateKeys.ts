import fs from "fs";
import path from "path";
import { generateKeyPairSync } from "crypto";

export function generateRS256Keys(): void {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  const certsDir = "./certs";
  if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
  }

  fs.writeFileSync(path.join(certsDir, "private.pem"), privateKey);
  fs.writeFileSync(path.join(certsDir, "public.pem"), publicKey);

  console.log("RS256 keys generated and saved to ./certs directory.");
}
