export interface UploadedFile {
  ID: number;
  src: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  mime: string;
  size: number;
  checksum: string;
  uploadedById: number;
  attachedToId?: number | null;
}
export interface UserBaseData {
  ID: number;
  username: string;
  avatar?: UploadedFile;
}
export interface Message {
  content: string;
  attachments: UploadedFile[];
  sender: UserBaseData;
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
  roomId: number;
}

export interface MsgSendPayload {
  roomType: RoomType;
  roomId: number;
  message: Message;
}

export interface MsgEditPayload {
  roomType: RoomType;
  roomId: number;
  messageId: number;
  newContent: string;
}

export interface MsgDeletePayload {
  roomType: RoomType;
  roomId: number;
  messageId: number;
}

export interface MsgReplyPayload {
  roomType: RoomType;
  roomId: number;
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
