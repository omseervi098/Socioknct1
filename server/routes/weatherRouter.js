import { Router } from "express";
import { getWeather } from "../controllers/weatherController.js";
import passport from "passport";
const router = Router();
router.get("/", (req, res) => {
  res.send({
    message: "Weather API is working",
  });
});
router.post(
  "/get",
  passport.authenticate("jwt", { session: false }),
  getWeather
);
export default router;
