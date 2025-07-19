import { Request, Response } from "express";
import { getActiveUsersCount } from "../services/user.service";

export const getAllActiveUsersCount = async (req: Request, res: Response) => {
  const count = getActiveUsersCount();
  res.json({ count });
};
