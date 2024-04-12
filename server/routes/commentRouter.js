import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";
import passport from "passport";
const router = Router();
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createComment
);
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  updateComment
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
router.get("/", passport.authenticate("jwt", { session: false }), getComments);
export default router;
