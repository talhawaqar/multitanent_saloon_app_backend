import { Router } from "express";
import {
  getActiveCategories,
  getAllCategories,
  create,
  update,
} from "../../controllers/categories.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/get-all-categories", getAllCategories);
router.get("/get-all-active-categories", getActiveCategories);
router.post("/create", authenticate, create);
router.put("/update", authenticate, update);

export default router;
