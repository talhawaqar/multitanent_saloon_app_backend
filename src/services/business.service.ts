import { prisma } from "../config";
import { BusinessEntityType } from "../types";
import { createLocations } from "./location.service";
import { createServicesLinks } from "./services.service";
import { BusinessEntityStatus, UserProfileType } from "../constants";

export const createBusiness = async (businessEntity: BusinessEntityType) => {
  const { name, description, locations, services } = businessEntity;

  const createdBusinessEntity = await prisma.businessEntity.create({
    data: { name, description, status: BusinessEntityStatus.Pending },
  });

  createLocations({ locations, businessEntityId: createdBusinessEntity.id });

  const servicesLinks = services?.map((service) => ({
    ...service,
    businessEntityId: createdBusinessEntity.id,
  }));

  createServicesLinks(servicesLinks);

  return createdBusinessEntity.id;
};

export const getBusinessesStatusesCount = async () => {
  const result: { status: string; _count: { status: number } }[] =
    await prisma.businessEntity.groupBy({
      by: ["status"],
      _count: true,
    });

  const formattedResult = result.map((item) => ({
    status: item.status,
    count: item._count.status,
  }));

  return formattedResult;
};

export const businessEntitiesInfo = async () => {
  const result = await prisma.businessEntity.findMany({
    select: {
      name: true,
      status: true,
      userProfiles: {
        where: {
          userProfileType: {
            code: UserProfileType.BUSINESS_OWNER,
          },
        },
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              contact: true,
            },
          },
        },
      },
      locations: {
        select: {
          name: true,
        },
      },
    },
  });
  return result;
};

export const entityById = async (id: number) => {
  const entity = await prisma.businessEntity.findUnique({
    where: {
      id: id,
    },
    include: {
      userProfiles: {
        where: {
          userProfileType: {
            code: UserProfileType.BUSINESS_OWNER,
          },
        },
        select: {
          user: true,
        },
      },
      locations: true,
      ratings: true,
    },
  });

  return entity;
};

export const changeStatus = async (id: number, status: string) => {
  const suspendedEntity = await prisma.businessEntity.update({
    where: {
      id: id,
    },
    data: { status: status},
  });

  return suspendedEntity;
};
