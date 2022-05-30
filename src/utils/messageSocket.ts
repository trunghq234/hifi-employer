import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL, {
  path: "/message",
});

export default socket;
