import { Alert, Box, TextField, Typography } from "@mui/material";
import { useContext } from "../hooks";
import Presets from "./presets";
import Commands from "./commands";

const Prompt = () => {
  const { setMessage, message, progress, log } = useContext();
  return (
    <Box>
      <Presets />
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        multiline
        rows={2} // specify the number of rows
        onChange={(e) => setMessage(e.target.value)}
        label="Prompt"
        placeholder="Tell me a joke"
        style={{ margin: "16px 0 " }}
        inputProps={{
          maxLength: 5000, // limiting message length to 1000 characters, can adjust as needed
        }}
      />
      <Commands />


      {log &&
        (
          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="body1">{log}</Typography>
          </Alert>
        )
      }
      <Alert severity={progress.includes('Finish') ? 'success' : 'info'} sx={{ mt: 1 }}>
        <Typography variant="body1">{progress || "Ready!"}</Typography>
      </Alert>
    </Box>
  );
};

export default Prompt;
