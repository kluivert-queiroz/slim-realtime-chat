const { server: express, app } = require("./server");
const { v1: uuidv1 } = require("uuid");
const { Server } = require("socket.io");
const { handleIncomeMessage } = require("./src/services/MessageService");
const {
  handleUserConnected,
  handleUserRenaming,
  handleUserDisconnected,
  handleShowAllUsers,
  findSession,
} = require("./src/services/UserService");
const {
  handleUserIsTyping,
  handleUserStoppedTyping,
} = require("./src/services/ChatService");

const io = new Server(express, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Express running!!");
});

io.on("connection", (socket) => {
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    username: socket.username,
  });
  socket.emit("users", handleShowAllUsers());
  socket.on("send-message", handleIncomeMessage(io, socket));
  socket.on("user-connected", handleUserConnected(io, socket));
  socket.on("rename-user", handleUserRenaming(io, socket));
  socket.on("started-typing", handleUserIsTyping(io, socket));
  socket.on("stopped-typing", handleUserStoppedTyping(io, socket));
  socket.on("disconnect", handleUserDisconnected(io, socket));
});
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.id;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  // create new session
  socket.sessionID = uuidv1();
  socket.userID = uuidv1();
  socket.username = username;
  next();
});
express.listen(process.env.PORT || 5000);
