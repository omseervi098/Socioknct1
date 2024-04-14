import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
} from "../controllers/postController.js";
import passport from "passport";
import { rateLimit1, rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.post(
  "/create",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  createPost
);
router.put(
  "/update/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  updatePost
);
router.delete(
  "/delete/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  deletePost
);
router.get(
  "/:id",
  rateLimit1,
  passport.authenticate("jwt", { session: false }),
  getPost
);
router.get(
  "/",
  rateLimit1,
  passport.authenticate("jwt", { session: false }),
  getPosts
);
export default router;
