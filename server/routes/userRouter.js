import { Router } from "express";
import {
  getUser,
  suggestUsers,
  getAllPostsOfUser,
  getAllCommentedPostsOfUser,
  getAllLikedPostsOfUser,
  getAllMediaOfUser,
  updateUser,
} from "../controllers/userController.js";
import { rateLimit2 } from "../middlewares/ratelimit.js";
const router = Router();
router.get("/suggested-users", rateLimit2, suggestUsers);
router.get("/:username", rateLimit2, getUser);
router.get("/:username/media", rateLimit2, getAllMediaOfUser);
router.get("/:username/posts", rateLimit2, getAllPostsOfUser);
router.get("/:username/posts/liked", rateLimit2, getAllLikedPostsOfUser);
router.get(
  "/:username/posts/commented",
  rateLimit2,
  getAllCommentedPostsOfUser
);
router.put("/:username", rateLimit2, updateUser);
export default router;
