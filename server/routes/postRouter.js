import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
  votePost,
  unvotePost,
  getTotalPosts,
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
router.get(
  "/length",
  rateLimit1,
  passport.authenticate("jwt", { session: false }),
  getTotalPosts
);
router.put(
  "/vote/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  votePost
);
router.delete(
  "/unvote/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  unvotePost
);
export default router;
