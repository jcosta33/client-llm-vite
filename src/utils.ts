export const formatPrompt = (
  language: string,
  context: string,
  message: string,
  source: string
) => {
  let prompt = "";
  if (language !== "") prompt += `\nProgramming language: ${language};\n`;
  if (context !== "") prompt += ` \nTools: ${context};\n`;
  if (message !== "") prompt += ` \n Request: ${message}; \n`;
  if (source !== "") prompt += `\n Code: ${source}\n `;
  return prompt;
};
