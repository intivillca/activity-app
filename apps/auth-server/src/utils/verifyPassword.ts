import bcrypt from "bcrypt";

async function verifyPassword(
  password: string,
  hashedPassword: string,
  salt: string
): Promise<boolean> {
  try {
    const pepper = process.env.PEPPER;
    if (!pepper) {
      throw new Error("Missing password pepper");
    }
    const combinedPassword = password + pepper;

    const hashedCombinedPassword: string = await bcrypt.hash(
      combinedPassword,
      salt
    );

    return hashedCombinedPassword === hashedPassword;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}

export default verifyPassword;
