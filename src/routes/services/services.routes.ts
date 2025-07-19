import { Router } from "express";
import {
  getActiveServices,
  getAllServices,
  create,
  update,
  getServicesByCategoryId,
} from "../../controllers/services.controller";

const router = Router();

router.get("/get-active-services", getActiveServices);
router.get("/get-all-services", getAllServices);
router.get("get-services-by-category-id", getServicesByCategoryId);
router.post("/create", create);
router.put("/update", update);

export default router;
