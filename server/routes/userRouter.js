import { Router } from "express";
import { suggestUsers } from "../controllers/userController.js";
import { rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.get("/suggested-users", rateLimit2, suggestUsers);
export default router;
