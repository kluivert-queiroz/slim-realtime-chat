class UserMap {
  #users = new Map();
  getUsers() {
    return Array.from(this.#users.values());
  }
  findUser(sessionID) {
    console.log(sessionID, [...this.#users.values()]);
    return this.#users.get(sessionID);
  }
  addUser = ({ sessionID, id, username, socketID }) => {
    const socketIds = this.#users.get(sessionID)?.socketIds || [];
    socketIds.push(socketID);
    this.#users.set(sessionID, {
      id,
      username,
      socketIds,
      sessionID,
      connected: true,
    });
    console.log("users", [...this.#users.values()]);
  };
  updateConnectionStatus = (sessionID, connected) => {
    this.#users.get(sessionID).connected = connected;
  }
  removeUser = (sessionID) => {
    const user = this.#users.get(sessionID).connected = false;
    return user;
  };
  rename = (sessionID, username) => {
    const user = this.#users.get(sessionID);
    this.#users.set(user.sessionID, { ...user, username });
  };
}

module.exports = UserMap;
