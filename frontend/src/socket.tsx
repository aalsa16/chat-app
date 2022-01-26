import React from "react";
import socketio from "socket.io-client";

const SOCKET_URL = "ws://34.205.19.29:3333";

// @ts-ignore
export const socket = socketio.connect(SOCKET_URL);
// @ts-ignore
export const SocketContext = React.createContext<SocketIOClient.Socket>(socket);