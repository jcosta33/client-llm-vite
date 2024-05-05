import { Engine, EngineWorkerHandler } from "@mlc-ai/web-llm";

const engine = new Engine();
const handler = new EngineWorkerHandler(engine);
self.onmessage = (msg) => {
  handler.onmessage(msg);
};
