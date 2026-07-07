import ResetIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { webLLMModels } from "../constants";
import { useContext } from "../hooks";

const Tweaker = () => {
  const {
    model,
    setModel,
    chatLoading,
    options,
    setSingleOption,
    reset,
    setOptionsUpdated,
    system,
    setSystem,
  } = useContext();

  return (
    <Box>
      <Typography variant="h6">Settings</Typography>
      <br />
      <FormControl variant="outlined" sx={{ width: "100%" }}>
        <InputLabel id="llm-model-label"> Model</InputLabel>
        <Select
          labelId="llm-model-label"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            setOptionsUpdated(true);
          }}
          label="Model"
        >
          {webLLMModels.map((model, index) => (
            <MenuItem key={index} value={model.name}>
              {model.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <TextField
        multiline
        rows={2}
        value={system}
        onChange={(e) => {
          setSystem(e.target.value);
        }}
        fullWidth
        label="System context"
        helperText="Contextual information to guide the model's behavior."
      />
      <br />
      <br />
      <InputLabel>Repetition deterrence</InputLabel>
      <Slider
        size="small"
        value={options.repetition_penalty}
        onChange={(_e, newValue) => {
          setSingleOption("repetition_penalty", newValue as number);
        }}
        min={0.5}
        max={2.0}
        step={0.1}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Penalizes repeated content. 1 is neutral, {">"}1 reduces, and {"<"}1
        increases repetitions.
      </FormHelperText>
      <br />
      <InputLabel>Output diversity</InputLabel>
      <Slider
        size="small"
        value={options.top_p}
        onChange={(_e, newValue) => {
          setSingleOption("top_p", newValue as number);
        }}
        min={0.1}
        max={0.8}
        step={0.1}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Controls output diversity. Closer to 0 for deterministic outputs.
      </FormHelperText>
      <br />

      <InputLabel>Randomness level</InputLabel>
      <Slider
        size="small"
        value={options.temperature}
        onChange={(_e, newValue) => {
          setSingleOption("temperature", newValue as number);
        }}
        min={0}
        max={2}
        step={0.1}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Controls randomness. 0 for deterministic outputs, higher for more
        randomness.
      </FormHelperText>
      <br />
      <InputLabel>Presence penalty</InputLabel>
      <Slider
        size="small"
        value={options.presence_penalty}
        onChange={(_e, newValue) => {
          setSingleOption("presence_penalty", newValue as number);
        }}
        min={-2}
        max={2}
        step={0.1}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Number between -2.0 and 2.0. Positive values penalize new tokens based
        on whether they appear in the text so far, increasing the model's
        likelihood to talk about new topics.
      </FormHelperText>
      <br />
      <InputLabel>Frequency penalty</InputLabel>
      <Slider
        size="small"
        value={options.frequency_penalty}
        onChange={(_e, newValue) => {
          setSingleOption("frequency_penalty", newValue as number);
        }}
        min={-2}
        max={2}
        step={0.1}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Number between -2.0 and 2.0. Positive values penalize new tokens based
        on their existing frequency in the text so far, decreasing the model's
        likelihood to repeat the same line verbatim.
      </FormHelperText>
      <br />

      <InputLabel>Max output length</InputLabel>
      <Slider
        size="small"
        value={options.max_tokens ?? 5000}
        onChange={(_e, newValue) => {
          setSingleOption("max_tokens", newValue as number);
        }}
        min={100}
        max={10000}
        step={1}
      />

      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Desired max length of the generated output.
      </FormHelperText>

      {/* {source === "web-llm" && (
        <>
          <InputLabel>Shift fill factor</InputLabel>
          <Slider
            size="small"
            value={options.shift_fill_factor}
            onChange={(_e, newValue) => {
              setSingleOption("shift_fill_factor", newValue as number);
              setOptionsUpdated(true);
            }}
            min={0}
            max={2}
            step={0.02}
          />
          <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
            Determines the model's tendency to stick to or shift topics.
          </FormHelperText>
        </>
      )} */}
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="text"
          sx={{ color: "#999" }}
          startIcon={<ResetIcon />}
          disabled={chatLoading}
          onClick={reset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Tweaker;
