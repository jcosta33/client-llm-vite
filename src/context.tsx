import {
  ChatOptions,
  CreateMLCEngine,
  InitProgressReport,
  MLCEngine,
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
    "You are a helpful assistant. You are here to help the user with their queries. You can provide information, answer questions, and provide step-by-step instructions. Output in markdown format so that the responses are formatted correctly."
  );
  const [log, setLog] = useState("");
  const [progress, setProgress] = useState("");
  const [messages, setMessages] = useState<PromptResponse[]>([]);
  const [source, setSource] = useState("web-llm");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [context, setContext] = useState("");
  const [language, setLanguage] = useState("");
  const [model, setModel] = useState("Llama-3.2-1B-Instruct-q4f16_1-MLC");
  const [options, setOptions] = useState<ChatOptions>(chatOpts);
  const [optionsUpdated, setOptionsUpdated] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [layout, setLayout] = useState("chat");
  const chatRef = useRef(null as MLCEngine | null);

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
      chatRef.current = await CreateMLCEngine(
        model,
        {
          initProgressCallback: (report: InitProgressReport) => {
            setProgress(report.text);
          },
        }
      );
    } catch (err: unknown) {
      setProgress("Init error, " + (err?.toString() ?? ""));
    }
    setOptionsUpdated(false);
    setChatLoading(false);
  }, [model]);

  const reset = useCallback(async () => {
    setMessages([]);
    if (chatRef.current !== null) {
      chatRef.current.resetChat();
    }
    setOptions(chatOpts);
  }, []);

  const handleWebLLMMessage = useCallback(async () => {
    if (optionsUpdated || chatRef.current === null) {
      await reload();
    }

    const asyncChunkGenerator = await chatRef.current?.chat.completions.create({
      messages: [
        {
          role: "system",
          content: system,
        },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: prompt },
      ],
      stream: true,
      ...options,
    });

    if (!asyncChunkGenerator) return;

    let message = "";
    let messagePushed = false;
    for await (const chunk of asyncChunkGenerator) {
      if (chunk.choices[0].delta.content) {
        if (chatLoading) {
          setChatLoading(false);
        }
        message += chunk.choices[0].delta.content;
        if (messagePushed) {
          setMessages((prev) =>
            prev.map((msg, index) =>
              index === 0
                ? { content: message, model: model, role: "assistant" }
                : msg
            )
          );
        } else {
          setMessages((prev) => [
            { content: message, model: model, role: "assistant" },
            ...prev,
          ]);
          messagePushed = true;
        }
      }
    }
    setLog((await chatRef.current?.runtimeStatsText()) || "");
  }, [
    optionsUpdated,
    system,
    messages,
    prompt,
    options,
    reload,
    chatLoading,
    model,
  ]);

  /**
   * Determines the source and sends the message accordingly.
   */
  const sendMessage = useCallback(async () => {
    setChatLoading(true);
    setMessages([{ role: "user", content: prompt, model: "you" }, ...messages]);
    setMessage("");
    await handleWebLLMMessage();
    setChatLoading(false);
  }, [handleWebLLMMessage, messages, prompt]);

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
