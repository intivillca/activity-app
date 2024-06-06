import { Request, Response } from "express";
import RegisterUserSchema from "../schemas/registerSchema";
import { db } from "@activityapp/db";
import hashPassword from "../utils/hashPassword";
import { generateAccessToken } from "../utils/generateAccessToken";

async function registerUserController(req: Request, res: Response) {
  try {
    const { username, email, password } = RegisterUserSchema.parse(req.body);

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const { password: hashedPassword, salt } = await hashPassword(password);

    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        salt: salt,
      },
    });
    if (!newUser) {
      return res.status(400).json({ error: "Error creating user" });
    }

    const token = generateAccessToken(newUser.ID);

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default registerUserController;
