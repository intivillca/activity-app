import { MessageServer, MessageSocket, MsgReplyPayload } from "../../types";

export const msgReplyHandler = (io: MessageServer, socket: MessageSocket) => {
  socket.on("msgReply", (payload: MsgReplyPayload) => {
    const roomName = `${payload.roomType}-${payload.roomId}`;
    console.log(`Reply sent in room ${roomName}: ${payload.messageId}`);
    io.to(roomName).emit("msgReply", payload);
  });
};
