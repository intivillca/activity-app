import { Server } from "socket.io";
import { Events } from "../types";

export const io: Server<Events> = new Server();
