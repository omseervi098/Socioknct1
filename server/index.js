import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import { createServer } from "node:http";
import { jwtStrategy } from "./config/passport.js";
import authRouter from "./routes/authRouter.js";
import otpRouter from "./routes/otpRouter.js";
import newsRouter from "./routes/newsRouter.js";
import weatherRouter from "./routes/weatherRouter.js";
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRouter.js";
import replyRouter from "./routes/replyRouter.js";
import notificationRouter from "./routes/notificationRouter.js";
import { apiContent } from "./middlewares/apiContentType.js";
import { allowCrossDomain } from "./middlewares/allowCrossDomain.js";
import setupSocket from "./config/socket.js";
import db from "./config/mongoose.js";
dotenv.config({ path: ".env" });
const app = express();

//Allow CORS
app.use(cors());
app.options("*", cors());
app.use(apiContent);

// Use common 3rd-party middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const server = createServer(app);
const io = setupSocket(server);
// Passport
passport.use(jwtStrategy);

// Auth Router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/weather", weatherRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/reply", replyRouter);
app.use("/api/v1/notification", notificationRouter);

app.get("/api/v1", (req, res) => {
  res.send({
    message: "Welcome to Socioknct API",
  });
});
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Socioknct API",
  });
});
// Listening to the server
server.listen(process.env.PORT || 5000, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  }
});
