import { Router } from "express";
import {
  getActiveCategories,
  getAllCategories,
  create,
  update,
} from "../../controllers/categories.controller";

const router = Router();

router.get("/get-all-categories", getAllCategories);
router.get("/get-all-active-categories", getActiveCategories);
router.post("/create", create);
router.put("/update", update);

export default router;
