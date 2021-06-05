import React from 'react';
import socketio from "socket.io-client";
console.log("Connecting to socket host:", process.env.REACT_APP_SOCKET_HOST);
export const socket = socketio.connect(process.env.REACT_APP_SOCKET_HOST);
export const SocketContext = React.createContext(socket);