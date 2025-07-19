// src/routes/index.ts
import { Router } from "express";
import appointmentRoutes from "./appointment/appointment.route";
import authRoutes from "./auth/auth.routes";
import businessEntityRoutes from "./business-entity/business-entity.routes";
import ratingRoutes from "./raitings/raiting.routes";
import serviceRoutes from "./services/services.routes";
import userRoutes from "./users/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/business-entity", businessEntityRoutes);
router.use("/ratings", ratingRoutes);
router.use("/services", serviceRoutes);
router.use("/users", userRoutes);

export default router;
