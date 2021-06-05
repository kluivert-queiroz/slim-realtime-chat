import { makeStyles } from "@material-ui/core";
import React from "react";
import MessageBox from "./components/MessageBox";
import TextBox from "./components/TextBox";
import UsersSidebar from "./components/UsersSidebar";
const useStyles = makeStyles({
  app: {
    height: "100%",
    flexDirection: "row",
    display: "flex",
    position: "relative",
    flexGrow: 1,
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
});
function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <div className={classes.sidebar}>
        <UsersSidebar />
      </div>
      <div className={classes.main}>
        <MessageBox />
        <TextBox />
      </div>
    </div>
  );
}

export default App;
