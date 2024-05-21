import { Request, Response } from "express";

export const addUser = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  res.send("User Created!!");
};
