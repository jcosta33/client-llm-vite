import { GenerationConfig } from "@mlc-ai/web-llm";

// override default
// see https://mlc.ai/mlc-llm/docs/get_started/mlc_chat_config.html
export const chatOpts: GenerationConfig = {
  repetition_penalty: 1.2,
  top_p: 0.2,
  temperature: 0.5,
  max_tokens: 5000,
  presence_penalty: 0.0,
  frequency_penalty: 0.0,
};
