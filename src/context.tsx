import {
  ChatOptions,
  CreateEngine,
  Engine,
  InitProgressReport,
} from "@mlc-ai/web-llm";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { chatOpts } from "./configs";
import { ContextType, PromptResponse } from "./types";
import { formatPrompt } from "./utils";

const Context = createContext<ContextType | undefined>(undefined);

/**
 * Provider Component to manage and share chat states.
 * @param {ReactNode} children - Children components wrapped by this Provider.
 * @returns {JSX.Element} Provider component.
 */
const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State definitions
  const [system, setSystem] = useState(
    chatOpts.conv_config?.system_template || ""
  );
  const [log, setLog] = useState("");
  const [progress, setProgress] = useState("");
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
  const chatRef = useRef(null as Engine | null);

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

  const stop = useCallback(() => {
    if (chatRef.current !== null) chatRef.current.interruptGenerate();
  }, []);

  /**
   * Reloads chat configuration and initializes chat.
   */
  const reload = useCallback(async () => {
    setChatLoading(true);
    setLog("");
    try {
      chatRef.current = await CreateEngine(model, {
        chatOpts: {
          ...chatOpts,
          ...options,
        },
        initProgressCallback: (report: InitProgressReport) => {
          setProgress(report.text);
        },
      });
    } catch (err: unknown) {
      setProgress("Init error, " + (err?.toString() ?? ""));
    }
    setOptionsUpdated(false);
    setChatLoading(false);
  }, [model, options]);

  const reset = useCallback(async () => {
    setMessages([]);
    if (chatRef.current !== null) chatRef.current.resetChat();
    setOptions(chatOpts);
    setOptionsUpdated(true);
    reload();
  }, [reload]);

  const handleWebLLMMessage = useCallback(async () => {
    if (optionsUpdated || chatRef.current === null) {
      await reload();
    }

    const oldMessages = messages;

    const asyncChunkGenerator = await chatRef.current?.chat.completions.create({
      messages: [
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: prompt },
      ],
      stream: true,
      logprobs: true,
      top_logprobs: 2,
    });

    if (!asyncChunkGenerator) {
      return;
    }

    setChatLoading(false);

    let message = "";

    for await (const chunk of asyncChunkGenerator) {
      if (chunk.choices[0].delta.content) {
        message += chunk.choices[0].delta.content;
      }
      setMessages([
        { role: "assistant", model: model, content: message },
        ...oldMessages,
      ]);

      // engine.interruptGenerate();  // works with interrupt as well
    }
    setLog((await chatRef.current?.runtimeStatsText()) || "");
  }, [optionsUpdated, messages, prompt, reload, model]);

  /**
   * Determines the source and sends the message accordingly.
   */
  const sendMessage = useCallback(async () => {
    setChatLoading(true);
    await handleWebLLMMessage();
    setChatLoading(false);
  }, [handleWebLLMMessage]);

  const sendCommand = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_command: string) => {
      // chat.generate(command, async (_step, response) => {
      //   setMessages([{ value: response, model: model }, ...oldMessages]);
      //   setLog(await chat.runtimeStatsText());
      // });
    },
    []
  );

  // Provider value
  const value = {
    setOptionsUpdated,
    log,
    setLog,
    progress,
    setProgress,
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
