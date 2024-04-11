import { Router } from "express";
import { getWeather } from "../controllers/weatherController.js";
const router = Router();
router.get("/", (req, res) => {
  res.send({
    message: "Weather API is working",
  });
});
router.post("/get", getWeather);
export default router;
