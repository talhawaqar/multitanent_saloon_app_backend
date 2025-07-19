import { Request, Response } from "express";
import { CategoryType } from "../types";
import {
  createCategory,
  updateCategory,
  allCategories,
  activeCategories,
} from "../services/categories.service";

export const create = async (req: Request, res: Response) => {
  const { category }: { category: CategoryType } = req.body;
  const createdCategory = await createCategory(category);

  res.json({ createdCategory });
};

export const update = async (req: Request, res: Response) => {
  const { category }: { category: CategoryType } = req.body;
  const updatedCategory = await updateCategory(category);

  res.json({ updatedCategory });
};

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = allCategories();

  res.json({ categories });
};

export const getActiveCategories = (req: Request, res: Response) => {
  const categories = activeCategories();

  res.json({ categories });
};
