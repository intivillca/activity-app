import { MessageServer, MessageSocket, MsgEditPayload } from "../../types";

export const msgEditHandler = (io: MessageServer, socket: MessageSocket) => {
  socket.on("msgEdit", (payload: MsgEditPayload) => {
    const roomName = `${payload.roomType}-${payload.roomId}`;
    console.log(`Message edited in room ${roomName}: ${payload.messageId}`);
    io.to(roomName).emit("msgEdit", payload);
  });
};
