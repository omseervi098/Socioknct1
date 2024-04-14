import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";
import passport from "passport";
import { rateLimit2, rateLimit1 } from "../middlewares/ratelimit.js";
const router = Router();
router.post(
  "/create",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  createComment
);
router.put(
  "/update/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  updateComment
);
router.delete(
  "/delete/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
router.get(
  "/",
  rateLimit1,
  passport.authenticate("jwt", { session: false }),
  getComments
);
export default router;
