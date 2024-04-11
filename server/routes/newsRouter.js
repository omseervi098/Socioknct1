import { Router } from "express";
const router = Router();
import { getNews } from "../controllers/newsController.js";
router.get("/", getNews);
export default router;
