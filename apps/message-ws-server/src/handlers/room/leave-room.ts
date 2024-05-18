import {
  JoinLeaveRoomPayload,
  MessageServer,
  MessageSocket,
} from "../../types";

export const leaveRoomHandler = (io: MessageServer, socket: MessageSocket) => {
  socket.on("leaveRoom", (payload: JoinLeaveRoomPayload) => {
    const roomName = `${payload.roomType}-${payload.roomId}`;
    socket.leave(roomName);
    console.log(`User left room ${roomName}`);
  });
};
