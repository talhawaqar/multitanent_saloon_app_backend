import { Request, Response } from "express";
import {
  getBusinessesStatusesCount,
  businessEntitiesInfo,
  entityById,
  changeStatus,
  businessEntitiesAdminGridData,
} from "../services/business.service";
import { BusinessEntityStatus } from "../constants";

export const getBusinessEntittiesStatusesCount = async (
  req: Request,
  res: Response
) => {
  const stats = getBusinessesStatusesCount();
  res.json({ stats });
};

export const getBusinessEntitiesInfo = async (req: Request, res: Response) => {
  const businessEntities = businessEntitiesInfo();
  res.json({ businessEntities });
};

export const findById = async (req: Request, res: Response) => {
  const qId = req.query.id as string;
  const id = parseInt(qId);
  const entity = await entityById(id);

  res.json(entity);
};

export const approveEntity = async (req: Request, res: Response) => {
  const { id }: { id: number } = req.body;
  const entity = changeStatus(id, BusinessEntityStatus.Active);

  res.json({ entity });
};

export const suspendEntity = async (req: Request, res: Response) => {
  const { id }: { id: number } = req.body;
  const entity = changeStatus(id, BusinessEntityStatus.Suspended);

  res.json({ entity });
};

export const getBusinessEntitiesMainInfo = async (
  req: Request,
  res: Response
) => {
  const entitiesData = await businessEntitiesAdminGridData();

  res.json(entitiesData);
};
