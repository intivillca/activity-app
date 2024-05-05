import bcrypt from "bcrypt";
import { getSaltRounds } from "./getSaltRounds";

interface HashPasswordReturn {
  password: string;
  salt: string;
}
async function hashPassword(password: string): Promise<HashPasswordReturn> {
  try {
    const pepper = process.env.PEPPER;
    if (!pepper) {
      throw new Error("Missing password pepper");
    }

    const saltRounds = getSaltRounds();
    const salt = await bcrypt.genSalt(saltRounds);

    const combinedPassword = password + pepper;

    const hashedPassword = await bcrypt.hash(combinedPassword, salt);

    return { password: hashedPassword, salt };
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
}

export default hashPassword;
