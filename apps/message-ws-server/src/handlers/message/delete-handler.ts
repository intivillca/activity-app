import { MessageServer, MessageSocket, MsgDeletePayload } from "../../types";

export const msgDeleteHandler = (io: MessageServer, socket: MessageSocket) => {
  socket.on("msgDelete", (payload: MsgDeletePayload) => {
    const roomName = `${payload.roomType}-${payload.roomId}`;
    console.log(`Message deleted in room ${roomName}: ${payload.messageId}`);
    io.to(roomName).emit("msgDelete", payload);
  });
};
