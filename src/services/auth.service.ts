import jwt from "jsonwebtoken";
import { hashPassword, comparePasswords } from "../utils/hash";
import { env, prisma } from "../config";
import { UserType, BusinessEntityType } from "../types";
import { registerUserProfile } from "./user.service";
import { User, UserProfile } from "@prisma/client";

const JWT_SECRET = env.JWT_SECRET;

export const register = async ({
  user,
  userProfileTypeCode,
  businessEntity,
}: {
  user: UserType;
  userProfileTypeCode: string;
  businessEntity?: BusinessEntityType;
}) => {
  const { username, firstName, lastName, email, password, contact } = user;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error("User already exists");

  const hashed = await hashPassword(password);
  const createdUser = await prisma.user.create({
    data: { email, password: hashed, firstName, username, lastName, contact },
  });

  const userProfile = await registerUserProfile({
    userId: createdUser.id,
    userProfileTypeCode,
    businessEntity,
  });

  if (!userProfile) throw new Error("User not found");

  return createToken(createdUser, userProfile);
};

export const login = async (
  username: string,
  password: string,
  userProfileTypeCode: string
) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error("User not found");

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  const userProfileType = await prisma.userProfileType.findFirst({
    where: { code: userProfileTypeCode },
  });

  if (!userProfileType) throw new Error("User not found");

  const userProfile = await prisma.userProfile.findFirst({
    where: { userId: user.id, userProfileTypeId: userProfileType.id },
  });
  if (!userProfile) throw new Error("User not found");

  return createToken(user, userProfile);
};

const createToken = (user: User, userProfile: UserProfile) => {
  return jwt.sign(
    { userId: user.id, email: user.email, userProfileId: userProfile.id },
    JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );
};
