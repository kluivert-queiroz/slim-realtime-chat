import { styled, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import User from "./User";

const UsersSidebar = ({ className }) => {
  const socket = React.useContext(SocketContext);
  const [users, setUsers] = React.useState([]);
  const me = useSelector((state) => state.name);

  const removeUser = (userId) => {
    setUsers((users) => users.filter((user) => user.id !== userId));
  };
  React.useEffect(() => {
    socket.emit("user-connected", { user: me });
    socket.on("user-connected", (user) => {
      console.log(user, "recebido");
      setUsers(user.totalUsers);
    });
    socket.on("user-disconnect", (user) => {
      console.log(user, "disconnect");
      removeUser(user.id);
    });
  }, []);
  return (
    <div className={className}>
      <Typography className="title" variant="subtitle1">
        Users online:
      </Typography>
      <User name={me} me />
      {users
        .filter((user) => user.id !== socket.id)
        .map(({ name }) => (
          <User name={name} />
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
