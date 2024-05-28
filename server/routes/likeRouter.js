import { Router } from "express";
import { toggleLike } from "../controllers/likeController.js";
import { rateLimit2 } from "../middlewares/ratelimit.js";
import passport from "passport";
const router = Router();
router.patch(
  "/toggle",
  passport.authenticate("jwt", { session: false }),
  rateLimit2,
  toggleLike
);
router.get("/", (req, res) => {
  res.send({
    message: "Welcome to Socioknct API",
  });
});
export default router;
