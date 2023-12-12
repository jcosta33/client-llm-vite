import {
  InputLabel,
  TextField,
  Button,
  Box,
  Slider,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext } from "../hooks";
import ResetIcon from "@mui/icons-material/RestartAlt";
import { openAIModels, webLLMModels } from "../constants";

const Tweaker = () => {
  const {
    model,
    setModel,
    chatLoading,
    options,
    setSingleOption,
    source,
    setSource,
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
        <InputLabel id="runtime-label"> Runtime</InputLabel>
        <Select
          labelId="runtime-label"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            if (e.target.value === "open-ai") {
              setModel("gpt-3.5-turbo-16k");
            } else {
              setModel("Llama-2-7b-chat-hf-q4f32_1");
            }
            setOptionsUpdated(true);
          }}
          label="Runtime"
        >
          <MenuItem value="web-llm">WebLLM</MenuItem>
          <MenuItem value="open-ai">OpenAI</MenuItem>
        </Select>
      </FormControl>
      <br />
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
          {(source === "open-ai" ? openAIModels : webLLMModels).map(
            (model, index) => (
              <MenuItem key={index} value={model.name}>
                {model.label}
              </MenuItem>
            )
          )}
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
          setOptionsUpdated(true);
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
          setOptionsUpdated(true);
        }}
        min={0.5}
        max={2.0}
        step={0.01}
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
          setOptionsUpdated(true);
        }}
        min={0}
        max={1}
        step={0.01}
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
          setOptionsUpdated(true);
        }}
        min={0}
        max={2}
        step={0.01}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Controls randomness. 0 for deterministic outputs, higher for more
        randomness.
      </FormHelperText>
      <br />
      {source === "web-llm" && (
        <>
          <InputLabel>Average output length</InputLabel>
          <Slider
            size="small"
            value={options.mean_gen_len}
            onChange={(_e, newValue) => {
              setSingleOption("mean_gen_len", newValue as number);
              setOptionsUpdated(true);
            }}
            min={100}
            max={1500}
            step={1}
          />
          <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
            Desired average length of the generated output.
          </FormHelperText>
        </>
      )}
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
