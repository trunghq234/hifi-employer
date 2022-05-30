import io from "socket.io-client";

console.log(import.meta.env.VITE_SERVER_URL);

const notificationSocket = io(import.meta.env.VITE_SERVER_URL, {
  path: "/notification",
});

export default notificationSocket;
