import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/userService";
import { User } from "../types";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("Name, email, and password are required");
    return;
  }

  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id, name, email, password: hashedPassword };
  createUser(newUser);
  res.status(201).json({ message: "User created successfully" });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }

  const user = getUserByEmail(email);

  if (!user) {
    res.status(401).send("User not found");
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401).send("Invalid password");
    return;
  }

  res.status(200).json({ message: "Login successful" });
};
