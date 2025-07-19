import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, required = true): string {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Environment variable "${name}" is missing`);
  }
  return value!;
}

export const env = {
  PORT: parseInt(getEnv("PORT", false)) || 3002,
  JWT_SECRET: getEnv("JWT_SECRET") || "default_secret",
  JWT_EXPIRES_IN: parseInt(getEnv("JWT_EXPIRES_IN", false)) || 3600,
  NODE_ENV: getEnv("NODE_ENV"),
};
