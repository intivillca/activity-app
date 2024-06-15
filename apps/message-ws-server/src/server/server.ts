import { messageHandlers } from "../handlers/message";
import { joinRoomHandler } from "../handlers/room/join-room";
import { leaveRoomHandler } from "../handlers/room/leave-room";
import { MessageServer, MessageSocket } from "../types";

export const messageServer = (io: MessageServer) => {
  console.log("Setting up message server...");
  io.on("connection", (socket: MessageSocket) => {
    console.log("Connect?", socket.id);
    joinRoomHandler(io, socket);
    leaveRoomHandler(io, socket);
    messageHandlers(io, socket);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
