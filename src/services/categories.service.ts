import { prisma } from "../config";
import { ModelStatus } from "../constants";
import { CategoryType } from "../types";

export const createCategory = async (category: CategoryType) => {
  const createdCategory = prisma.category.create({
    data: category,
  });

  return createdCategory;
};

export const updateCategory = async (category: CategoryType) => {
  const updatedcategory = await prisma.category.update({
    where: { id: category.id },
    data: category,
  });

  return updatedcategory;
};

export const allCategories = async () => {
  const categories = await prisma.categories.findMany();
  return categories;
};

export const activeCategories = async () => {
  const categories = await prisma.categories.findMany({
    where: {
      status: ModelStatus.Active,
    },
  });
  return categories;
};
