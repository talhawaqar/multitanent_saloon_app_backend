import { prisma } from "../config";
import { ServiceLinkType, ServiceType } from "../types";
import { ModelStatus } from "../constants";

export const createServicesLinks = async (services: ServiceLinkType[] = []) => {
  if (!services.length) {
    return;
  }
  console.log("service service", services);
  await prisma.businessEntityServiceLink.createMany({ data: services });
};

export const activeServices = async () => {
  const activeServices = await prisma.service.findMany({
    where: {
      status: ModelStatus.Active,
      category: {
        status: ModelStatus.Active,
      },
    },
    include: {
      category: true,
    },
  });

  return activeServices;
};

export const allServices = async () => {
  const services = await prisma.service.findMany({
    include: {
      category: true,
    },
  });

  return services;
};

export const createService = async (service: ServiceType) => {
  const createdService = await prisma.service.create({
    data: service,
    include: {
      category: true,
    },
  });

  return createdService;
};

export const updateService = async (service: ServiceType) => {
  const updatedService = await prisma.service.update({
    where: { id: service.id },
    data: {
      name: service.name,
      description: service.description,
      status: service.status,
    },
    include: {
      category: true,
    },
  });

  return updatedService;
};

export const serviceByCategoryId = async (categoryId: number) => {
  const servicesByCategory = await prisma.service.findMany({
    where: {
      categoryId: categoryId,
    },
  });

  return servicesByCategory;
};
