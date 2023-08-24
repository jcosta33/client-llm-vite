import { Button, Box } from "@mui/material";
import { useContext } from "../hooks";
import StopIcon from "@mui/icons-material/Stop"; // For "Stop Generation"
import ReplayIcon from "@mui/icons-material/Replay"; // For "Redo"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // For "Are you sure?"
import SendIcon from "@mui/icons-material/Send"; // For "Are you sure?"
import ClearIcon from "@mui/icons-material/Clear"; // For "Are you sure?"

const Commands = () => {
  const {
    messages,
    chatLoading,
    sendCommand,
    setMessage,
    message,
    stop,
    sendMessage,
  } = useContext();

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Button
          startIcon={<SendIcon />}
          color="success"
          onClick={sendMessage}
          disabled={chatLoading}
        >
          Send
        </Button>

        <Button
          disabled={chatLoading}
          startIcon={<StopIcon />}
          color="warning"
          onClick={() => stop()}
        >
          Stop
        </Button>
        <Button
          disabled={message === ""}
          startIcon={<ClearIcon />}
          color="primary"
          onClick={() => setMessage("")}
        >
          Clear
        </Button>
      </Box>
      {messages.length > 0 && (
        <Box>
          <Button
            startIcon={<ReplayIcon />}
            color="info"
            onClick={() => sendCommand("Please redo the previous task.")}
          >
            Redo
          </Button>

          <Button
            startIcon={<HelpOutlineIcon />}
            color="info"
            onClick={() => sendCommand("Are you sure about that?")}
          >
            Are You Sure?
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Commands;
