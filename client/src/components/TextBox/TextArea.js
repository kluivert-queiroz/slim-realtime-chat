import React from "react";
import { SocketContext } from "../../context/socket";
const SECOND = 1000;

const TextArea = React.forwardRef(
  ({ onSubmit, tabSize = 2, me, ...props }, ref) => {
    const socket = React.useContext(SocketContext);
    const [value, setValue] = React.useState("");
    const [stateSelectionStart, setStateSelectionStart] = React.useState(0);
    const [stateSelectionEnd, setStateSelectionEnd] = React.useState(0);
    const [isTyping, setIsTyping] = React.useState(false);
    const txtInput = React.useRef(null);

    React.useImperativeHandle(ref, () => ({
      getContent: () => value,
      setValue: (newVal) => setValue(newVal),
    }));
    React.useEffect(() => {
      if (!isTyping && value !== "") {
        setIsTyping(true);
        socket.emit("started-typing", { user: me });
      }
      const stopTimer = setTimeout(() => {
        setIsTyping(false);
        socket.emit("stopped-typing", { user: me });
      }, SECOND * 2);
      return () => {
        clearTimeout(stopTimer);
      };
    }, [value, me]);
    React.useEffect(() => {
      const textArea = txtInput.current;
      if (!textArea) {
        return;
      }
      if (stateSelectionStart >= 0) {
        textArea.selectionStart = stateSelectionStart;
      }
      if (stateSelectionEnd >= 0) {
        textArea.selectionEnd = stateSelectionEnd;
      }
      resize();
    }, [value, stateSelectionStart, stateSelectionEnd]);
    const resize = () => {
      const textArea = txtInput.current;
      if (!textArea) {
        return;
      }
      while (textArea.scrollHeight > textArea.clientHeight) {
        textArea.rows = textArea.rows + 1;
      }
      if (textArea.value === "") textArea.rows = 1;
    };
    const handleChange = (e) => {
      setValue(e.target.value);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        onSubmit(value);
        e.preventDefault();
        return;
      }
      const textArea = e.target;
      const tabString = " ".repeat(tabSize);

      const txtValue = textArea.value;
      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;

      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();

        if (selectionStart !== selectionEnd) {
          const slices1 = getNewLineSlices(
            txtValue,
            selectionStart,
            selectionEnd
          );
          const newValue1 = addTabs(txtValue, slices1, tabString);

          setValue(newValue1);
          setStateSelectionStart(selectionStart + tabSize);
          setStateSelectionEnd(
            selectionEnd + (newValue1.length - txtValue.length)
          );
        } else {
          const newValue2 =
            txtValue.substring(0, selectionStart) +
            tabString +
            txtValue.substring(selectionEnd);

          setValue(newValue2);
          setStateSelectionStart(
            selectionEnd + tabSize - (selectionEnd - selectionStart)
          );
          setStateSelectionEnd(
            selectionEnd + tabSize - (selectionEnd - selectionStart)
          );
        }
      } else if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();

        const slices2 = getNewLineSlices(
          txtValue,
          selectionStart,
          selectionEnd
        );
        const newValue3 = removeTabs(txtValue, slices2, tabSize);

        const diff = txtValue.length - newValue3.length;

        setValue(newValue3);
        setStateSelectionStart(
          Math.max(0, selectionStart - (diff ? tabSize : 0))
        );
        setStateSelectionEnd(Math.max(0, selectionEnd - diff));
      } else {
        setStateSelectionStart(-1);
        setStateSelectionEnd(-1);
      }
    };

    function getNewLineSlices(value, selectionStart, selectionEnd) {
      const newLineLocations = getAllIndices(value, "\n");
      const left = findRange(newLineLocations, selectionStart);
      const split = value.split("\n");

      const arr = [];
      let count = 0;
      for (let i = 0; i < split.length; i++) {
        const line = split[i];

        if (count > left && count <= selectionEnd) {
          arr.push(line);
        } else {
          arr.push(null);
        }

        count += line.length + 1;
      }

      return arr;
    }

    function addTabs(value, arr, joiner) {
      const split = value.split("\n");

      let ret = "";
      for (let i = 0; i < split.length; i++) {
        const val = split[i];
        const newLineVal = arr[i];

        if (newLineVal === val) {
          ret += joiner;
        }

        ret += val;
        if (i !== split.length - 1) {
          ret += "\n";
        }
      }

      return ret;
    }

    function removeTabs(value, arr, tabSize) {
      const split = value.split("\n");

      let ret = "";
      for (let i = 0; i < split.length; i++) {
        const val = split[i];
        const newLineVal = arr[i];

        if (!val.startsWith(" ") || newLineVal !== val) {
          ret += val;
          if (i !== split.length - 1) {
            ret += "\n";
          }

          continue;
        }

        let count = 1;
        while (val[count] === " " && count < tabSize) {
          count++;
        }

        ret += val.substring(count);
        if (i !== split.length - 1) {
          ret += "\n";
        }
      }

      return ret;
    }

    function getAllIndices(arr, val) {
      const indices = [];
      let i = -1;

      while ((i = arr.indexOf(val, i + 1)) !== -1) {
        indices.push(i);
      }

      return indices;
    }

    function findRange(arr, min) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= min) {
          return i === 0 ? -1 : arr[i - 1];
        }
      }

      return arr[arr.length - 1];
    }
    return (
      <textarea
        {...props}
        ref={txtInput}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

export default TextArea;
