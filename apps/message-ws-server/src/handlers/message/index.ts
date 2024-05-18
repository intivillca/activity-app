import { MessageServer, MessageSocket } from "../../types";
import { msgDeleteHandler } from "./delete-handler";
import { msgEditHandler } from "./edit-handler";
import { msgReplyHandler } from "./reply-handler";
import { msgSendHandler } from "./send-handler";

export const messageHandlers = (
  server: MessageServer,
  socket: MessageSocket
) => {
  msgSendHandler(server, socket);
  msgDeleteHandler(server, socket);
  msgEditHandler(server, socket);
  msgReplyHandler(server, socket);
};
