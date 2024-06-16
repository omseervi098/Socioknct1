import { Router } from "express";
import {
  getUser,
  suggestUsers,
  getAllMediaOfUser,
} from "../controllers/userController.js";
import { rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.get("/suggested-users", rateLimit2, suggestUsers);
router.get("/:username", rateLimit2, getUser);
router.get("/:username/media", rateLimit2, getAllMediaOfUser);
export default router;
