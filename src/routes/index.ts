// src/routes/index.ts
import { Router } from "express";
import appointmentRoutes from "./appointment/appointment.route";
import authRoutes from "./auth/auth.routes";
import businessEntityRoutes from "./business-entity/business-entity.routes";
import categoryRoutes from "./cattegories/categories.route";
import ratingRoutes from "./raitings/raiting.routes";
import serviceRoutes from "./services/services.routes";
import userRoutes from "./users/user.routes";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use("/auth", authRoutes);
router.use("/appointments", authenticate, appointmentRoutes);
router.use("/business-entities", businessEntityRoutes);
router.use("/categories", categoryRoutes);
// router.use("/categories", categoryRoutes);

router.use("/ratings", ratingRoutes);
router.use("/services", serviceRoutes);
router.use("/users", authenticate, userRoutes);

export default router;
