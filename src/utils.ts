export const formatPrompt = (
  language: string,
  context: string,
  message: string,
  source: string
) => {
  let prompt = "";
  if (language !== "") prompt += `Programming language: ${language};\n`;
  if (context !== "") prompt += ` Tools: ${context};\n`;
  if (source !== "") prompt += `Code: ${source}\n `;
  if (message !== "") prompt += message;
  return prompt;
};
