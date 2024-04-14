import { Router } from "express";
import {
  creatingUser,
  loginUser,
  googleAuth,
} from "../controllers/userController.js";
import { rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.post("/google/auth", rateLimit2, googleAuth);
router.post("/register", rateLimit2, creatingUser);
router.post("/login", rateLimit2, loginUser);
export default router;
