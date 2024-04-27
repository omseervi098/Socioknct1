import { Router } from "express";
const router = Router();
import { joinNotificationRoom } from "../controllers/notificationController.js";
import passport from "passport";
router.post("/join-room", passport.authenticate("jwt", { session: false }), joinNotificationRoom);
export default router;