import { Request, Response, NextFunction } from "express";

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authData = (req as any).authData as {
      userId: number;
      userProfileCode: string;
    };

    if (!authData) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (
      !authData.userProfileCode ||
      !allowedRoles.includes(authData.userProfileCode)
    ) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
      return;
    }

    next();
  };
};
