import React from "react";
import Grid from "@material-ui/core/Grid";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as highlightStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

import { styled, Typography } from "@material-ui/core";
const Message = ({ message, user, renderUserName, date, className }) => {
  return (
    <Grid container direction="column" className={className}>
      {renderUserName && (
        <Grid item className="userNameRow">
          <Typography className="user" variant="body1">
            {user || "Random"}
          </Typography>
        </Grid>
      )}
      <Grid item>
        <div className="time">
          <Typography variant="caption">
            {new Date(date).toLocaleTimeString().slice(0, -3)}
          </Typography>
        </div>

        <Typography component="div" className="message" variant="body1">
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={highlightStyle}
                    language={match[1]}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props} />
                );
              },
            }}
            remarkPlugins={[gfm]}
            children={message}
          />
        </Typography>
      </Grid>
    </Grid>
  );
};
export default styled((other) => <Message {...other} />)({
  paddingLeft: "2.5rem",
  lineHeight: "1.5rem",
  marginTop: "0.5rem",
  "& .time": {
    color: "grey",
    position: "absolute",
    left: 0,
  },
  "& :hover": {
    background: "#323439de",
  },
  "& .userNameRow": {
    marginTop: "0.5rem",
  },
  "& .message": {
    color: "#e3e3e3",
    fontSize: "1rem",
    lineHeight: "1.375rem",
    userSelect: "text",
    whiteSpace: "break-spaces",
    wordWrap: "break-word",
    fontWeight: 400,
    "& *": {
      margin: 0,
    },
    "& ul": {
      lineHeight: "0.5rem",
    },
    "& a": {
      color: "#1c75fb",
      textDecoration: "inherit",
    },
  },
  "& .user": {
    lineHeight: "1.375rem",
    fontSize: "16px",
    fontWeight: 500,
    color: "#e3e3e3",
  },
});
