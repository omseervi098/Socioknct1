import { Router } from "express";
import { sendOTP } from "../controllers/otpController.js";
import passport from "passport";
import { rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.post("/send-otp", rateLimit2, sendOTP);
export default router;
