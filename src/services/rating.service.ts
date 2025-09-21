import { prisma } from "../config";

export const averageRating = async () => {
  const result = await prisma.rating.aggregate({
    _avg: {
      rating: true,
    },
  });

  return result._avg.rating;
};

export const averageRatingByEntity = async (id: number) => {
  const result = await prisma.rating.aggregate({
    where: {
      businessEntityId: id,
    },
    _avg: {
      rating: true,
    },
  });

  return result._avg.rating;
};
