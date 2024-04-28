import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
dotenv.config({ path: ".env" });
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("room created", room);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
// ALLOW CORS
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// route for emiting votes
app.post("/api/v1/vote", (req, res) => {
  const { post } = req.body;
  io.emit("poll", post);
  res.send({ message: "Vote emitted" });
});
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Socioknct Websocket",
  });
});
server.listen(process.env.PORT || 8000, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log(
      `Websockets server is running on port ${process.env.PORT || 8000}`
    );
  }
});
