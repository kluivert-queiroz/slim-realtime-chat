import { styled, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import ChangeNicknameModal from "./ChangeNicknameModal";

const User = ({ username, me, className }) => {
  const modalRef = React.useRef();
  const handleClick = () => {
    if (modalRef.current) modalRef.current.triggerModal();
  };
  return (
    <div>
      <Tooltip title="Click to edit your username" disableHoverListener={!me}>
        <div className={className} onClick={handleClick}>
          <Typography variant="body1">
            {username} {me && "(me)"}
          </Typography>
        </div>
      </Tooltip>
      {me && <ChangeNicknameModal ref={modalRef} />}
    </div>
  );
};

export default styled((other) => <User {...other} />)({
  padding: "0.5rem",
  "&:hover": {
    background: "#7878780f",
    cursor: "pointer",
  },
});
