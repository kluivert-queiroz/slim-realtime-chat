import { styled, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import ChangeNicknameModal from "./ChangeNicknameModal";

const User = ({ name, me, className }) => {
  const modalRef = React.useRef();
  const handleClick = () => {
    if (modalRef.current) modalRef.current.triggerModal();
  };
  return (
    <div>
      <Tooltip title="Click to edit your name" disableHoverListener={!me}>
        <div className={className} onClick={handleClick}>
          <Typography variant="body1">
            {name} {me && "(me)"}
          </Typography>
        </div>
      </Tooltip>
      <ChangeNicknameModal ref={modalRef} />
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
