import { Request, Response } from "express";
import { getAppointmentsCount } from "../services/appointment.service";

export const getAllAppointmentsCount = async (req: Request, res: Response) => {
  const count = getAppointmentsCount();
  res.json({ count });
};
