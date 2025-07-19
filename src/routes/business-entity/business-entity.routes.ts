import { Router } from "express";
import {
  getBusinessEntittiesStatusesCount,
  getBusinessEntitiesInfo,
} from "../../controllers/business-entities.controller";

const router = Router();
router.get(
  "/business-entities-statuses-count",
  getBusinessEntittiesStatusesCount
);

router.get("/get-business-entities", getBusinessEntitiesInfo);

export default router;
