import { Router } from "express";
import passport from "passport";
import { createReply } from "../controllers/replyController.js";
const router = Router();
router.get("/", (req, res) => {
  res.send({
    message: "Welcome to Reply API",
  });
});
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createReply
);
export default router;
