import { Request, Response } from "express";
import { UserType, BusinessEntityType } from "../types";
import { login, register } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  const {
    user,
    userProfileTypeCode,
    businessEntity,
  }: {
    user: UserType;
    userProfileTypeCode: string;
    businessEntity?: BusinessEntityType;
  } = req.body;

  try {
    const token = await register({ user, userProfileTypeCode, businessEntity });
    res.json({ token });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password);
    res.json({ token });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
