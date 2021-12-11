import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "../../context/socket";

const ChangeNicknameModal = React.forwardRef((props, ref) => {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const [open, setState] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  React.useImperativeHandle(ref, () => ({
    triggerModal: () => {
      console.log("was called");
      setState((state) => !state);
    },
  }));
  const handleClose = () => {
    setState(false);
  };
  const handleChange = (e) => {
    setNickname(e.target.value.slice(0, 15));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitNickname();
  };
  const submitNickname = () => {
    dispatch({ type: "SET_NICKNAME", nickname });
    socket.emit("rename-user", {
      username: nickname,
      id: localStorage.getItem("userId"),
    });
    setState(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change nickname</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can choose any nickname you want. But it must be less than 15
          characters.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          value={nickname}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={submitNickname} variant="outlined" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
});

export default ChangeNicknameModal;
