import { Router } from "express";
import { sendOTP } from "../controllers/otpController.js";
import passport from "passport";
const router = Router();
router.post(
  "/send-otp",
  passport.authenticate("jwt", { session: false }),
  sendOTP
);
export default router;
