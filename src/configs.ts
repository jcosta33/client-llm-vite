import { AppConfig } from "@mlc-ai/web-llm";

export const appConfig: AppConfig = {
  model_list: [
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f32_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f32_1-ctx4k_cs1k-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-13b-chat-hf-q4f32_1-MLC/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf/Llama-2-13b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-hf-q4f16_1",
      required_features: ["shader-f16"],
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf/Llama-2-13b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-13b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f16_1-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-70b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-70b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-70b-chat-hf-q4f16_1-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_0",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx2k-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q4f32_1-ctx1k-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.2-q4f16_1-MLC/resolve/main/",
      local_id: "Mistral-7B-Instruct-v0.2-q4f16_1",
      required_features: ["shader-f16"],
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/phi-2-q4f32_1-MLC/resolve/main/",
      local_id: "phi-2-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/phi-2/phi-2-q4f32_1-ctx2k-webgpu.wasm"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/gemma-2b-it-q4f32_1-MLC/resolve/main/",
      local_id: "gemma-2b-it-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/gemma-2b-it/gemma-2b-it-q4f32_1-ctx4k_cs1k-webgpu.wasm"
    },
  ],
};

// override default
// see https://mlc.ai/mlc-llm/docs/get_started/mlc_chat_config.html
export const chatOpts = {
  repetition_penalty: 1.2,
  top_p: 0.8,
  temperature: 0.5,
  mean_gen_len: 400,
  //   shift_fill_factor: 0.3,
  conv_config: {
    system: "",
  },
};
