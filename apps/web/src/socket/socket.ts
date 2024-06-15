import { io, Socket } from "socket.io-client";
import { Events } from "./types";
import { createUseSocket, createUseSocketEvent, useSocket } from "./use-io";

const baseURL = process.env.REACT_APP_SOCKET_URL;
const authToken = window.localStorage.getItem("authToken");

if (!baseURL) {
  throw Error("Missing Socket baseUrl");
}

export const socket = io(baseURL) as Socket<Events>;

export const useSocketEvents = createUseSocket(socket);
