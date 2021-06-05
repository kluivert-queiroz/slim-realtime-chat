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
}

module.exports = UserMap;
