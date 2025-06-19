import jwt from 'jsonwebtoken';
import { hashPassword, comparePasswords } from '../utils/hash';
import { env, prisma } from "../config"

const JWT_SECRET = env.JWT_SECRET;

export const register = async (username: string, email: string, password: string, name: string) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error('User already exists');

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed, name, username },
  });

  return createToken(user);
};

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('User not found');

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) throw new Error('Invalid password');

  return createToken(user);
};

const createToken = (user: { id: number; email: string }) => {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn:  env.JWT_EXPIRES_IN,
  });
};
