import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import passport from "passport";
const router = Router();
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPost
);
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
router.get("/", passport.authenticate("jwt", { session: false }), getPosts);
export default router;
