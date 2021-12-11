import { styled, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import User from "./User";

const UsersSidebar = ({ className }) => {
  const socket = React.useContext(SocketContext);
  const [users, setUsers] = React.useState([]);
  // const me = useSelector((state) => state.username);

  const removeUser = (userId) => {
    setUsers((users) => users.filter((user) => user.id !== userId));
  };
  React.useEffect(() => {
    socket.emit("user-connected", { user: me });
    socket.on("users", (usersList) => {
      setUsers(usersList);
    });
    socket.on("user-connected", ({ id, username }) => {
      if (id === socket.userID) return;
      setUsers((asyncUsers) => {
        if (asyncUsers.find((user) => user.id === id)) return asyncUsers;
        return [
          ...asyncUsers.filter(({ userId }) => userId !== id),
          { id, username },
        ];
      });
    });
    socket.on("user-disconnect", (user) => {
      removeUser(user.id);
    });
    socket.on("rename-user", ({ totalUsers }) => {
      setUsers(totalUsers);
    });
  }, []);
  const me = () => {
    const defaultName = "No Nickname";
    if (!users) return defaultName;
    return (
      users.find((user) => user.id === socket.userID)?.username || defaultName
    );
  };
  return (
    <div className={className}>
      <Typography className="title" variant="subtitle1">
        Users online:
      </Typography>
      <User username={me()} me />
      {users
        .filter((user) => user.id !== socket.userID)
        .map(({ username }) => (
          <User username={username} />
        ))}
    </div>
  );
};

export default styled((props) => <UsersSidebar {...props} />)({
  background: "#2f3136",
  color: "#8e9297",
  "& .title": {
    fontWeight: 600,
  },
});
