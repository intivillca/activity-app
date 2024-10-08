import jwt from "jsonwebtoken";
import { getTokenExpiration } from "./getTokenExpiration";
import path from "path";
import fs from "fs";

export const generateAccessToken = (userID: number) => {
  try {
    const certsDir = path.join(process.cwd(), "certs");
    const privateKeyPath = path.join(certsDir, "private.pem");
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    const tokenExpiration = getTokenExpiration();
    return jwt.sign({ userID }, privateKey, {
      algorithm: "RS256",
      expiresIn: tokenExpiration,
    });
  } catch (e) {
    console.log(e);
  }
};
