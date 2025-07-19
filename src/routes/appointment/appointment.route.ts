import { Router } from "express";
import { getAllAppointmentsCount } from "../../controllers/appointments.controller";

const router = Router();

router.get("/gat-appointments-count", getAllAppointmentsCount);

export default router;
