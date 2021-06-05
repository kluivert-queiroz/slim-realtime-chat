import {
  Button,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import TextArea from "./TextArea";

const TextBox = ({ className }) => {
  const socket = React.useContext(SocketContext);
  const me = useSelector((state) => state.name);
  const [usersTyping, setUsersTyping] = React.useState([]);
  const textArea = React.useRef();
  const handleClick = (e) => {
    sendMessage(textArea.current.getContent());
  };
  const sendMessage = (message) => {
    if (message === "") return;
    socket.emit("send-message", { message, user: me, date: new Date() });
    textArea.current.setValue('');
    textArea.current.selectionStart = textArea.current.selectionEnd = 0;
  };
  React.useEffect(() => {
    socket.on("user-started-typing", (user) => {
      setUsersTyping((users) => [...users, user]);
    });
    socket.on("user-stopped-typing", (user) => {
      setUsersTyping((users) =>
        users.filter((typingUser) => typingUser.name !== user.name)
      );
    });
  }, []);
  return (
    <>
      {usersTyping.length > 0 && (
        <div className="typingBar">
          <Typography variant="body2">
            {usersTyping.map((user) => user.name).join(", ")} are typing...
          </Typography>
        </div>
      )}
      <Grid container direction="row" className={className}>
        <Grid item xs={11}>
          <TextArea
            ref={textArea}
            className="textbox"
            onSubmit={sendMessage}
            placeholder="Type something here..."
            multiple
            maxLength="1000"
            me={me}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            className="interactive"
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default styled((other) => <TextBox {...other} />)({
  border: "1px solid #40404094",
  boxShadow: "-1px 3px 9px #2c2c2c52",
  background: "#40444b",
  borderRadius: "1rem",
  "& .interactive": {
    color: "#b9bbbe",
  },
  "& .textbox": {
    fontFamily: "Montserrat",
    padding: "0.5rem",
    width: "100%",
    height: "100%",
    background: "transparent",
    border: "0",
    color: "#e3e3e3",
    fontSize: "1rem",
    resize: "none",
  },
  "& .typingBar": {
    position: "absolute",
    left: 10,
    bottom: 5,
  },
});
