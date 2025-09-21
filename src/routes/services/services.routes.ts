import { Router } from "express";
import {
  getActiveServices,
  getAllServices,
  create,
  update,
  getServicesByCategoryId,
} from "../../controllers/services.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/get-active-services", getActiveServices);
router.get("/get-all-services", getAllServices);
router.get("/get-services-by-category-id", getServicesByCategoryId);
router.post("/create", authenticate, create);
router.put("/update", authenticate, update);

export default router;
