const { v1: uuidv1 } = require("uuid");
const handleIncomeMessage = (io, socket) => (message) => {
  io.emit("new-message", { ...message, id: uuidv1() });
};

module.exports = {
  handleIncomeMessage,
};
