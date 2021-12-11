const handleUserIsTyping =
  (io, socket) =>
  ({ user }) => {
    io.emit("user-started-typing", { username: user });
  };
const handleUserStoppedTyping =
  (io, socket) =>
  ({ user }) => {
    io.emit("user-stopped-typing", { username: user });
  };

module.exports = {
  handleUserIsTyping,
  handleUserStoppedTyping,
};
