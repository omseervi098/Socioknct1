import { Router } from "express";
import {
  addBookmark,
  removeBookmark,
  getBookmarkedPosts,
} from "../controllers/bookmarkController.js";
import passport from "passport";
import { rateLimit1, rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.patch(
  "/post/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  addBookmark
);
router.get(
  "/posts",
  rateLimit1,
  passport.authenticate("jwt", { session: false }),
  getBookmarkedPosts
);
router.delete(
  "/post/:id",
  rateLimit2,
  passport.authenticate("jwt", { session: false }),
  removeBookmark
);
export default router;
