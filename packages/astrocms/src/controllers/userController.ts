import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/userService";
import { User } from "../types";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";
import Joi from "joi";

const JWT_SECRET = config.JWT_SECRET || "Secret_Key";

export const addUser = async (req: Request, res: Response): Promise<void> => {
  // Define a Joi schema for validating the request body
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  // Validate the request body against the schema
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { name, email, password } = req.body;

  // Check if the email is already in use
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    res.status(400).send("Email is already in use");
    return;
  }

  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id, name, email, password: hashedPassword };

  await createUser(newUser);
  res.status(201).json({ message: "User created successfully" });
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  // Define a Joi schema for validating the request body
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  // Validate the request body against the schema
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(401).send("User not found");
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401).send("Invalid password");
    return;
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true, 
  });
  res.status(200).json({ message: "Login successful", token });
};

export default { loginUser, addUser };
