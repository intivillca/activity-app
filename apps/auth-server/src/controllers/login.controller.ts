import { Request, Response } from "express";
import { db } from "@tripapp/db";
import verifyPassword from "../utils/verifyPassword";
import { generateAccessToken } from "../utils/generateAccessToken";

async function loginUserController(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await db.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await verifyPassword(
      password,
      user.password,
      user.salt
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = generateAccessToken(user.username);
    return res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default loginUserController;
