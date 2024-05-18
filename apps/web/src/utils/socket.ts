import { io } from "socket.io-client";

const URL = process.env.SOCKET_URL ?? "";
const authToken = window.localStorage.getItem("authToken");

export const socket = io(URL, {
  auth: {
    token: authToken,
  },
});
