import { prisma } from "../config/";

export const getAppointmentsCount = async () => {
  return await prisma.appointment.count();
};
