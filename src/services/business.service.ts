import { prisma } from "../config";
import { BusinessEntityType } from "../types";
import { createLocations } from "./location.service";

export const createBusiness = async (businessEntity: BusinessEntityType) => {
  const { name, locations, services } = businessEntity;

  const createdBusinessEntity: BusinessEntityType =
    await prisma.businessEntity.create({
      data: { name },
    });

  createLocations({ locations, businessEntityId: createdBusinessEntity.id });
  createServices
};
