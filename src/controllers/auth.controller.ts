import { Request, Response } from "express";
import { UserType, BusinessEntityType, LocationFiles } from "../types";
import { login, register } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  const {
    user,
    userProfileTypeCode,
    businessEntity,
  }: {
    user: string;
    userProfileTypeCode: string;
    businessEntity?: string;
  } = req.body;

  const parsedUser: UserType = JSON.parse(user);
  let parsedBusinessEntity: BusinessEntityType | undefined = undefined;

  if (businessEntity) {
    parsedBusinessEntity = JSON.parse(businessEntity);
  }

  console.log(parsedBusinessEntity?.services);

  const files = req.files as LocationFiles;

  try {
    const token = await register({
      user: parsedUser,
      userProfileTypeCode,
      businessEntity: parsedBusinessEntity,
      files,
    });
    res.json({ token });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const { token, userProfileTypeCode } = await login(username, password);
    res.json({ token, userProfileTypeCode });
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
};
