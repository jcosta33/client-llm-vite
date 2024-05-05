export const formatPrompt = (
  language: string,
  context: string,
  message: string,
  source: string
) => {
  let prompt = "";
  if (language !== "") prompt += `Programming language: ${language};\n`;
  if (context !== "") prompt += ` Frameworks and Libraries: ${context};\n`;
  if (source !== "") prompt += `\`\`\`${source}\n\`\`\`\n`;
  if (message !== "") prompt += message;
  return prompt;
};
