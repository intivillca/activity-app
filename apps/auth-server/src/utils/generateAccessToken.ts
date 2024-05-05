import jwt from "jsonwebtoken";
import { getTokenExpiration } from "./getTokenExpiration";
import path from "path";
import fs from "fs";

export const generateAccessToken = (username: string) => {
  try {
    const privateKeyPath = path.join(__dirname, "certs", "private.pem");
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    const tokenExpiration = getTokenExpiration();
    return jwt.sign({ username }, privateKey, {
      algorithm: "RS256",
      expiresIn: tokenExpiration,
    });
  } catch (e) {
    console.log(e);
  }
};
