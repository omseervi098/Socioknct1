import io from "socket.io-client";
let socket;
const connectSocket = () => {
  socket = io.connect(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
};
const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

if (!socket) {
  connectSocket();
}

export { socket, connectSocket, disconnectSocket };
