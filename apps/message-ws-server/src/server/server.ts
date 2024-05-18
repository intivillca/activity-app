import { messageHandlers } from "../handlers/message";
import { MessageServer, MessageSocket } from "../types";

export const messageServer = (io: MessageServer) => {
  console.log("Setting up message server...");
  io.on("connection", (socket: MessageSocket) => {
    console.log("Connect?");
    messageHandlers(io, socket);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
