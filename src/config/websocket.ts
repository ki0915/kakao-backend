import { Server } from "http";
import { Server as Websocket, Socket, Namespace } from "socket.io";
import { readMessage, receiveMessage } from "../socket/chat.socket";

let websocket: Namespace;

export enum ChatListenEvent {
  JOIN_CHANNEL = "joinChannel",
  JOIN_ROOM = "joinRoom",
  SEND_MESSAGE = "sendMessage",
  READ_MESSAGE = "readMessage",
}

export enum ChatEmitEvent {
  RECEIVE_MESSAGE = "receiveMessage",
  UPDATE_ROOM = "updateRoom",
}

export const initializeWebsocket = (server: Server) => {
  const io = new Websocket(server, {
    cors: {},
  });

  websocket = io.of("/chats");
  websocket.on("connect", (socket: Socket) => {
    console.log("connected");
    socket.on(ChatListenEvent.JOIN_ROOM, ({ chatId }) => {
      socket.join(`chat-$(chatId)`);
    });

    socket.on(ChatListenEvent.SEND_MESSAGE, receiveMessage);
    socket.on(ChatListenEvent.READ_MESSAGE, readMessage);
  });

  websocket.on("error", (socket: Socket) => {
    console.log("sfsfsf");
  });
};

export const getSocket = () => {
  return websocket;
};
