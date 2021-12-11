import React from "react";
import io from "socket.io-client";
console.log("Connecting to socket host:", process.env.REACT_APP_SOCKET_HOST);
export const socket = io.connect(process.env.REACT_APP_SOCKET_HOST, {
  autoConnect: false,
});
const sessionID = localStorage.getItem("sessionID");
if (sessionID) {
  socket.auth = { sessionID };
} else {
  socket.auth = { username: "No nickname" };
}
socket.connect();
socket.on("session", ({ sessionID, userID }) => {
  console.log("sessionID:", sessionID, userID);
  socket.auth = { sessionID };
  localStorage.setItem("sessionID", sessionID);
  socket.userID = userID;
});
console.log(socket);
export const SocketContext = React.createContext(socket);
