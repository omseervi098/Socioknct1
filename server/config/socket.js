import { Server } from "socket.io";
let io;
export default function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "https://socioknct.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  console.log("Socket setup");
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
  return io;
}
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
