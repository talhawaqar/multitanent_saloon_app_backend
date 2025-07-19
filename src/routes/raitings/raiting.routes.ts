import { Router } from "express";
import { getAverageRating } from "../../controllers/ratings.controller";

const router = Router();

router.get("/get-average-rating", getAverageRating);

export default router;
