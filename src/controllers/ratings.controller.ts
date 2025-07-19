import { Request, Response } from "express";
import { averageRating } from "../services/rating.service";

export const getAverageRating = async (req: Request, res: Response) => {
  const average = averageRating();

  res.json(average);
};
