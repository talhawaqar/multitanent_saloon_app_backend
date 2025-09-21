import jwt from "jsonwebtoken";
import { hashPassword, comparePasswords } from "../utils/hash";
import { env, prisma } from "../config";
import { UserType, BusinessEntityType, LocationFiles } from "../types";
import { registerUserProfile } from "./user.service";
import { ModelStatus } from "../constants";

const JWT_SECRET = env.JWT_SECRET;

export const register = async ({
  user,
  userProfileTypeCode,
  businessEntity,
  files,
}: {
  user: UserType;
  userProfileTypeCode: string;
  businessEntity?: BusinessEntityType;
  files: LocationFiles;
}) => {
  const { username, firstName, lastName, email, password, contact } = user;
  const userExists = await prisma.user.findUnique({ where: { username } });
  if (userExists) throw new Error("User already exists");

  const hashed = await hashPassword(password);
  const createdUser = await prisma.user.create({
    data: { email, password: hashed, firstName, username, lastName, contact },
  });

  const userProfileType = await prisma.userProfileType.findFirst({
    where: { code: userProfileTypeCode },
    select: { id: true, name: true, code: true },
  });

  if (!userProfileType) throw new Error("User Profile not found");

  const userProfile = await registerUserProfile({
    userId: createdUser.id,
    userProfileTypeCode,
    businessEntity,
    files,
  });

  if (!userProfile) throw new Error("User not found");

  return createToken(createdUser.id, userProfileType.code);
};

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      userProfiles: true,
    },
  });

  if (!user) throw new Error("User not found");
  if (user.userProfiles?.[0].status === ModelStatus.InActive)
    throw new Error("Profile is not active");

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  const userProfileTypeId = user.userProfiles?.[0].userProfileTypeId;

  const userProfileType = await prisma.userProfileType.findFirst({
    where: { id: userProfileTypeId },
  });

  if (!userProfileType) throw new Error("User Profile not found");

  return {
    token: createToken(user.id, userProfileType.code),
    userProfileTypeCode: userProfileType.code,
  };
};

const createToken = (userId: number, userProfileCode: string) => {
  return jwt.sign({ userId, userProfileCode }, JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};
