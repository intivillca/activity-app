import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@tripapp/db";
import verifyPassword from "../utils/verifyPassword";
import { generateAccessToken } from "../utils/generateAccessToken";

async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await db.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Verify password
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
    res.status(500).json({ error: "Internal server error" });
  }
}

export default loginUser;
