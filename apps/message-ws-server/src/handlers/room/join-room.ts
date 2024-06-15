import {
  JoinLeaveRoomPayload,
  MessageServer,
  MessageSocket,
} from "../../types";

export const joinRoomHandler = (_io: MessageServer, socket: MessageSocket) => {
  socket.on("joinRoom", (payload: JoinLeaveRoomPayload) => {
    const roomName = `${payload.roomType}-${payload.roomId}`;
    console.log("Join room", roomName);

    socket.join(roomName);
  });
};
