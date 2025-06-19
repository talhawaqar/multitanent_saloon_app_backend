import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (plain: string, hash: string) => {
  return await bcrypt.compare(plain, hash);
};
