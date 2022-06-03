import io from "socket.io-client";

const notificationSocket = io(import.meta.env.VITE_SERVER_URL, {
  path: "/notification",
});

notificationSocket.connect();

export default notificationSocket;
