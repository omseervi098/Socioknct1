import { Router } from "express";
import { toggleLike } from "../controllers/likeController.js";
import { rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.post("/toggle", rateLimit2, toggleLike);
export default router;
