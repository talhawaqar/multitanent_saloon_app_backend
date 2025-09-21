import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);

  if (!token) {
    res.status(401).json({ error: "No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default");

    (req as any).authData = decoded;
  } catch {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};
