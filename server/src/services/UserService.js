const UserMap = require("../UserMap");
const users = new UserMap();
const handleUserConnected =
  (io, socket) =>
  ({ user }) => {
    if (!users.findUser(socket.sessionID)) {
      users.addUser({
        sessionID: socket.sessionID,
        id: socket.userID,
        username: socket.username,
        socketID: socket.id,
      });
    } else {
      users.updateConnectionStatus(socket.sessionID, true);
    }
    socket.broadcast.emit("user-connected", {
      id: socket.userID,
      username: socket.username,
      totalUsers: users.getUsers(),
    });
  };
const handleUserDisconnected = (io, socket) => () => {
  users.removeUser(socket.sessionID);
  io.emit("user-disconnect", {
    id: socket.sessionID,
    totalUsers: users.getUsers(),
  });
};
const handleUserRenaming =
  (io, socket) =>
  ({ id, username }) => {
    users.rename(socket.sessionID, username);
    socket.username = username;
    io.emit("rename-user", {
      id: socket.sessionID,
      username: username,
      totalUsers: users.getUsers(),
    });
  };
const handleShowAllUsers = () => {
  return users.getUsers();
};
const findSession = (sessionID) => {
  return users.findUser(sessionID);
};
module.exports = {
  handleUserConnected,
  handleUserRenaming,
  handleUserDisconnected,
  handleShowAllUsers,
  findSession,
};
