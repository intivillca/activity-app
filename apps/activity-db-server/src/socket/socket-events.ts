import { getSocket } from "./socket";
import { JoinLeaveRoomPayload, MsgSendPayload } from "./types";

export const handleJoinRoom = (data: JoinLeaveRoomPayload) => {
  getSocket().emit("joinRoom", data);
};
export const handleLeaveRoom = (data: JoinLeaveRoomPayload) => {
  getSocket().emit("leaveRoom", data);
};
export const sendMessage = (data: MsgSendPayload) => {
  getSocket().emit("msgSend", data);
};
