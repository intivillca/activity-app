import { Server, Socket } from "socket.io";

export interface Message {
  content: string;
  attachments: string[];
  senderId: number;
}

export interface GroupMessage extends Message {
  groupID: number;
}

export interface ActivityMessage extends Message {
  activityID: number;
}

export type BackendMessage = GroupMessage | ActivityMessage;

export type RoomType = "activity" | "group";

export interface JoinLeaveRoomPayload {
  roomType: RoomType;
  roomId: string;
}

export interface MsgSendPayload {
  roomType: RoomType;
  roomId: string;
  message: Message;
}

export interface MsgEditPayload {
  roomType: RoomType;
  roomId: string;
  messageId: number;
  newContent: string;
}

export interface MsgDeletePayload {
  roomType: RoomType;
  roomId: string;
  messageId: number;
}

export interface MsgReplyPayload {
  roomType: RoomType;
  roomId: string;
  messageId: number;
  reply: Message;
}

export interface Events {
  joinRoom: (data: JoinLeaveRoomPayload) => void;
  leaveRoom: (data: JoinLeaveRoomPayload) => void;
  msgSend: (data: MsgSendPayload) => void;
  msgEdit: (data: MsgEditPayload) => void;
  msgDelete: (data: MsgDeletePayload) => void;
  msgReply: (data: MsgReplyPayload) => void;
  disconnect: () => void;
}

export type MessageServer = Server<Events>;
export type MessageSocket = Socket<Events>;
