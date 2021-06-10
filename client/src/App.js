import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import MessageBox from "./components/MessageBox";
import TextBox from "./components/TextBox";
import UsersSidebar from "./components/UsersSidebar";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles({
  app: {
    height: "100%",
    flexDirection: "row",
    display: "flex",
    position: "relative",
    flexGrow: 1,
    maxHeight: "96vh",
  },
  sidebar: {
    flexDirection: "column",
    minHeight: 0,
    width: 240,
    flex: "0 0 auto",
    display: "flex",
    background: "#2f3136",
    padding: "0.5rem",
  },
  main: {
    padding: "1.5rem",
    flex: "1 1 auto",
    display: "flex",
    minWidth: 0,
    minHeight: 0,
    flexDirection: "column",
    background: "#36393f",
  },
  footer: {
    height: "100%",
    alignItems: "center",
    display: "flex",
    bottom: 0,
    width: "100%",
    placeContent: "center",
  },
});
function App() {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className={classes.app}>
        <aside className={classes.sidebar}>
          <UsersSidebar />
        </aside>
        <main className={classes.main}>
          <MessageBox />
          <TextBox />
        </main>
      </div>
      <footer className={classes.footer}>
        <Typography variant="body2">
          Made by Kluivert Queiroz <GitHubIcon style={{ fontSize: 15 }} />{" "}
          <a
            href="https://github.com/kluivert-queiroz/slim-realtime-chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to check the code!
          </a>
        </Typography>
      </footer>
    </div>
  );
}

export default App;
