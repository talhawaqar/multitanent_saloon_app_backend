import { Router } from "express";
import { getAllActiveUsersCount } from "../../controllers/users.controller";

const router = Router();

router.get("/get-all-user-count", getAllActiveUsersCount);

export default router;
