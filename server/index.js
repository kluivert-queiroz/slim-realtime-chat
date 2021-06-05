const { server: express, app } = require("./server");
const { Server } = require("socket.io");
const { 
  v1: uuidv1,
} = require('uuid');
const UserMap = require("./src/UserMap");

const io = new Server(express, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Express running!!");
});
const users = new UserMap();

io.on("connection", (socket) => {
  socket.on("send-message", (message) => {
    io.emit("new-message", {...message, id: uuidv1()});
  });
  socket.on("user-connected", ({ user }) => {
    users.addUser({ id: socket.id, name: user });
    io.emit("user-connected", {
      id: socket.id,
      name: user,
      totalUsers: users.getUsers(),
    });
  });
  socket.on("rename-user", ({ name }) => {
    users.rename(socket.id, name);
    io.emit("rename-user", {
      id: socket.id,
      totalUsers: users.getUsers(),
    });
  });
  socket.on("started-typing", ({ user }) => {
    io.emit("user-started-typing", { name: user });
  });
  socket.on("stopped-typing", ({ user }) => {
    io.emit("user-stopped-typing", { name: user });
  });
  socket.on("disconnect", () => {
    users.removeUser(socket.id);
    io.emit("user-disconnect", { id: socket.id, totalUsers: users.getUsers() });
  });
});
console.log("Running on port: ", process.env.PORT || 5000);
express.listen(process.env.PORT || 5000);
