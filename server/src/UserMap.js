class UserMap {
  #users = [];
  getUsers() {
    return this.#users;
  }
  addUser = (user) => {
    this.#users.push(user);
  };
  removeUser = (userId) => {
    this.#users = [...this.#users.filter((u) => u.id !== userId)];
  };
  rename = (userId, name) => {
    const userIndex = this.#users.findIndex((u) => u.id === userId);
    if (!userIndex) return;
    this.#users[userIndex] = { ...this.#users[userIndex], name };
  };
}

module.exports = UserMap;
