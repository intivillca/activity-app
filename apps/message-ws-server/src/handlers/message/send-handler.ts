import { MessageServer, MessageSocket, MsgSendPayload } from "../../types";

export const msgSendHandler = (io: MessageServer, socket: MessageSocket) => {
  socket.on("msgSend", (payload: MsgSendPayload) => {
    const roomName = `${payload.roomType}-${payload.roomId}`;
    console.log(`Message sent to room ${roomName}: ${payload.message.content}`);
    io.to(roomName).emit("msgSend", payload);
  });
};
