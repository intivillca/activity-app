import path from "path";
import fs from "fs";

function verifyKeyExistance() {
  try {
    const certsDir = path.join(process.cwd(), "certs");
    const privateKeyPath = path.join(certsDir, "private.pem");
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    const publicKeyPath = path.join(certsDir, "public.pem");
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");

    console.log("Keys found");
    return !!privateKey && !!publicKey;
  } catch (e) {
    console.log("Keys not found");
    return false;
  }
}

export default verifyKeyExistance;
