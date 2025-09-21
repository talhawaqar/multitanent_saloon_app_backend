import { Router } from "express";
import {
  getBusinessEntittiesStatusesCount,
  getBusinessEntitiesInfo,
  getBusinessEntitiesMainInfo,
  findById,
} from "../../controllers/business-entities.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { UserProfileType } from "../../constants";

const router = Router();

router.get(
  "/business-entities-statuses-count",
  getBusinessEntittiesStatusesCount
);
router.get("/find-by-id", findById);
router.get("/list-all-business-entities", getBusinessEntitiesInfo);
router.get(
  "/get-business-entities-main-info",
  authenticate,
  authorize([UserProfileType.ADMIN]),
  getBusinessEntitiesMainInfo
);

export default router;
