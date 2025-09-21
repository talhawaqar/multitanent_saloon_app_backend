import { Request, Response } from "express";
import {
  activeServices,
  allServices,
  createService,
  updateService,
  serviceByCategoryId,
} from "../services/services.service";
import { ServiceType } from "../types";

export const getActiveServices = async (req: Request, res: Response) => {
  const services = await activeServices();

  res.json(services);
};

export const getAllServices = async (req: Request, res: Response) => {
  const services = await allServices();

  res.json(services);
};

export const create = async (req: Request, res: Response) => {
  const { service }: { service: ServiceType } = req.body;
  const createdService = await createService(service);

  res.json({ createdService });
};

export const update = async (req: Request, res: Response) => {
  const { service }: { service: ServiceType } = req.body;
  const updatedService = await updateService(service);
  res.json({ updatedService });
};

export const getServicesByCategoryId = async (req: Request, res: Response) => {
  const { categoryId }: { categoryId: number } = req.body;
  const services = serviceByCategoryId(categoryId);

  res.json(services);
};
