import { socket } from "./socket";
import { JoinLeaveRoomPayload, MsgSendPayload } from "./types";

export const handleJoinRoom = (data: JoinLeaveRoomPayload) => {
  socket.emit("joinRoom", data);
};
export const handleLeaveRoom = (data: JoinLeaveRoomPayload) => {
  socket.emit("leaveRoom", data);
};
export const sendMessage = (data: MsgSendPayload) => {
  socket.emit("msgSend", data);
};
