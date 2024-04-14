import { Router } from "express";
const router = Router();
import { getNews } from "../controllers/newsController.js";
import passport from "passport";
router.get("/", passport.authenticate("jwt", { session: false }), getNews);
export default router;
