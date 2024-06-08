import { createHash } from "crypto";

export const calculateChecksum = (
  buffer: Buffer,
  algorithm: string = "sha256"
): string => {
  const hash = createHash(algorithm);
  hash.update(buffer);
  return hash.digest("hex");
};
