import {
  ChatWorkerClient,
  ChatModule,
  ChatOptions,
  InitProgressReport,
} from "@mlc-ai/web-llm";
import React, {
  useState,
  useCallback,
  createContext,
  ReactNode,
  useMemo,
} from "react";
import { chatOpts, appConfig } from "./configs";
import { OpenAI } from "openai";
import { formatPrompt } from "./utils";
import { ContextType, PromptResponse } from "./types";

let chat: ChatWorkerClient | ChatModule = new ChatModule();

if (typeof window !== "undefined") {
  chat = new ChatWorkerClient(
    new Worker(new URL("./worker.ts", import.meta.url), { type: "module" })
  );
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_PUBLIC_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Context = createContext<ContextType | undefined>(undefined);

/**
 * Provider Component to manage and share chat states.
 * @param {ReactNode} children - Children components wrapped by this Provider.
 * @returns {JSX.Element} Provider component.
 */
const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State definitions
  const [system, setSystem] = useState(chatOpts.conv_config.system);
  const [log, setLog] = useState("");
  const [messages, setMessages] = useState<PromptResponse[]>([]);
  const [source, setSource] = useState("web-llm");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [context, setContext] = useState("");
  const [language, setLanguage] = useState("");
  const [model, setModel] = useState("Llama-2-7b-chat-hf-q4f32_1");
  const [options, setOptions] = useState<ChatOptions>(chatOpts);
  const [optionsUpdated, setOptionsUpdated] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [layout, setLayout] = useState("chat");

  // Calculate prompt value based on language, context, message, and code
  const prompt = useMemo(
    () => formatPrompt(language, context, message, code),
    [language, context, message, code]
  );

  // Callbacks & Handlers
  const setSingleOption = useCallback(
    (key: keyof ChatOptions, value: string | number) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(async () => {
    setMessages([]);
    chat.resetChat();
    setOptions(chatOpts);
    setOptionsUpdated(true);
    reload();
  }, []);

  const stop = useCallback(() => chat.interruptGenerate(), []);

  /**
   * Reloads chat configuration and initializes chat.
   */
  const reload = useCallback(async () => {
    setChatLoading(true);

    try {
      await chat.unload();
      await chat.resetChat();
      chat.setInitProgressCallback((report: InitProgressReport) => {
        setLog(
          report.text.replace(
            "It can take a while when we first visit this page to populate the cache. Later refreshes will become faster.",
            ""
          )
        );
      });
      await chat.reload(
        model,
        {
          ...chatOpts,
          ...options,
          conv_config: {
            system,
          },
        },
        appConfig
      );
      setOptionsUpdated(false);
      setChatLoading(false);
    } catch (err: unknown) {
      await chat.unload();
      setLog("Init error, " + (err?.toString() ?? ""));
      setChatLoading(false);
    }
  }, [optionsUpdated, model, options, system]);

  /**
   * Handles sending messages via OpenAI.
   */
  const handleOpenAiMessage = useCallback(async () => {
    const oldMessages = messages;
    const stream = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      stream: true,
      temperature: options.temperature,
      top_p: options.top_p,
      max_tokens: 10000,
      frequency_penalty: options.repetition_penalty,
    });

    setChatLoading(false);
    let response = "";
    for await (const part of stream) {
      response += part.choices[0]?.delta?.content || "";
      setMessages([{ value: response, model: model }, ...oldMessages]);
    }
  }, [prompt, optionsUpdated]);

  /**
   * Sends messages using the WebLLM method.
   */
  const handleWebLLMMessage = useCallback(async () => {
    if (!optionsUpdated) {
      await sendWebLLMMessage();
    } else {
      await reload();
      await sendWebLLMMessage();
    }
  }, [prompt, optionsUpdated]);

  const sendWebLLMMessage = useCallback(async () => {
    const oldMessages = messages;
    let chatLoadingStopped = false;
    await chat.generate(prompt, async (_step, response) => {
      if (!chatLoadingStopped && response !== "") {
        chatLoadingStopped = true;
        setChatLoading(false);
      }
      setMessages([{ value: response, model: model }, ...oldMessages]);
      setLog(await chat.runtimeStatsText());
    });
  }, [prompt, optionsUpdated, chatLoading]);

  /**
   * Determines the source and sends the message accordingly.
   */
  const sendMessage = useCallback(async () => {
    setChatLoading(true);
    if (source === "open-ai") {
      await handleOpenAiMessage();
    } else {
      await handleWebLLMMessage();
    }
    setChatLoading(false);
  }, [prompt, optionsUpdated]);

  const sendCommand = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_command: string) => {
      // chat.generate(command, async (_step, response) => {
      //   setMessages([{ value: response, model: model }, ...oldMessages]);
      //   setLog(await chat.runtimeStatsText());
      // });
    },
    [chat, messages, model]
  );

  // Provider value
  const value = {
    setOptionsUpdated,
    log,
    setLog,
    messages,
    setMessages,
    message,
    setMessage,
    chatLoading,
    setChatLoading,
    model,
    setModel,
    system,
    setSystem,
    context,
    setContext,
    source,
    setSource,
    code,
    language,
    options,
    setSingleOption,
    setLanguage,
    setCode,
    reset,
    stop,
    sendMessage,
    sendCommand,
    fullscreen,
    setFullscreen,
    layout,
    setLayout,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
