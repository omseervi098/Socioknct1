import { Router } from "express";
import passport from "passport";
import {
  createReply,
  deleteReply,
  editReply,
} from "../controllers/replyController.js";
const router = Router();
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      message: "Welcome to Reply API",
    });
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createReply
);
router.put(
  "/update/:replyId",
  passport.authenticate("jwt", { session: false }),
  editReply
);
router.delete(
  "/delete/:replyId",
  passport.authenticate("jwt", { session: false }),
  deleteReply
);
export default router;
