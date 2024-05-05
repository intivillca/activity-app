import { Request, Response } from "express";
import RegisterUserSchema from "../schemas/registerSchema";
import { db } from "@tripapp/db";
import bcrypt from "bcrypt";
import hashPassword from "../utils/hashPassword";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate request body against schema
    const { username, email, password } = RegisterUserSchema.parse(req.body);

    // Check if the username or email already exists in the database
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

    // Create new user
    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        salt: salt,
      },
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
