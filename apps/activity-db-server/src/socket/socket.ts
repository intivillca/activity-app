import { io, Socket } from "socket.io-client";
import { Events } from "./types";

let socket: Socket<Events> | null = null;

export function initializeSocket() {
  const baseURL = process.env.SOCKET_URL;

  if (!baseURL) {
    throw new Error("SOCKET_URL environment variable is not defined");
  }

  socket = io(baseURL);

  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket is not initialized");
  }
  return socket;
}
