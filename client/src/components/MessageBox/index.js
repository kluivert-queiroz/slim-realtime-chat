import { styled, Typography } from "@material-ui/core";
import React from "react";
import { SocketContext } from "../../context/socket";
import Message from "./Message";

const MessageBox = (props) => {
  const socket = React.useContext(SocketContext);
  const [messages, setMessages] = React.useState([]);
  const containerRef = React.useRef();
  const receiveNewMessage = (message) => {
    setMessages((aMessages) => [...aMessages, message]);
  };
  const scrollToBottomIfNeeded = () => {
    const element = containerRef.current;
    if (!element) return;
    console.log(
      "Scroll value:",
      Math.floor(element.scrollHeight),
      Math.floor(element.scrollTop),
      Math.floor(element.scrollHeight) - Math.floor(element.scrollTop),
      element.clientHeight
    );
    if (
      Math.floor(element.scrollHeight) - Math.floor(element.scrollTop) <
      element.clientHeight + 200
    ) {
      element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
    }
  };
  React.useEffect(() => {
    scrollToBottomIfNeeded();
  }, [messages]);
  React.useEffect(() => {
    socket.on("new-message", (message) => {
      receiveNewMessage(message);
    });
  }, []);
  return (
    <div className={`${props.className} toolbar`} ref={containerRef}>
      {messages.map(({ message, user, date }, idx, arr) => (
        <Message
          message={message}
          user={user}
          date={date}
          renderUserName={arr[idx - 1]?.user !== user}
        />
      ))}
    </div>
  );
};

export default styled(({ height, ...other }) => <MessageBox {...other} />)({
  height: (props) => props.height || "90vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "auto",
});
