import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext } from "../hooks";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import { codeString } from "../constants";
import { programmingLanguages } from "../constants";
import Prompt from "./prompt";

const Input = () => {
  const { sendMessage, context, setContext, setCode, language, setLanguage } =
    useContext();
  return (
    <Box>
      <Box display="flex" gap={2} marginBottom={2}>
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="Language"
          >
            {programmingLanguages.map((lang) => (
              <MenuItem key={lang.name} value={lang.name}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="outlined"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          label="Frameworks, libraries, tools"
          placeholder="e.g., React, Express, Node.js, Webpack"
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          inputProps={{
            maxLength: 1000, // limiting message length to 1000 characters, can adjust as needed
          }}
        />
      </Box>
      <CodeMirror
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setCode(value)}
        theme={githubDark}
        placeholder={codeString}
        maxHeight="60vh"
        style={{ margin: "0 0 16px 0", fontSize: "12px" }}
      />
      <Prompt />
    </Box>
  );
};

export default Input;
