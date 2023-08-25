export const programmingLanguages = [
  { label: "Python", name: "python" },
  { label: "JavaScript", name: "javascript" },
  { label: "Java", name: "java" },
  { label: "C++", name: "cpp" },
  { label: "C#", name: "csharp" },
  { label: "PHP", name: "php" },
  { label: "Swift", name: "swift" },
  { label: "Go", name: "go" },
  { label: "Ruby", name: "ruby" },
  { label: "TypeScript", name: "typescript" },
  { label: "Kotlin", name: "kotlin" },
  { label: "Rust", name: "rust" },
  { label: "Scala", name: "scala" },
  { label: "Perl", name: "perl" },
];

export const webLLMModels = [
  {
    label: "Llama 2 7b f32",
    name: "Llama-2-7b-chat-hf-q4f32_1",
  },
  {
    label: "Llama 2 7b f16",
    name: "Llama-2-7b-chat-hf-q4f16_1",
  },
  {
    label: "Llama 2 13b f32",
    name: "Llama-2-13b-chat-hf-q4f32_1",
  },
  {
    label: "Llama 2 13b f16",
    name: "Llama-2-13b-chat-hf-q4f16_1",
  },
  {
    label: "Llama 2 70b f16",
    name: "Llama-2-70b-chat-hf-q4f16_1",
  },
  {
    label: "RedPajama 3B f32",
    name: "RedPajama-INCITE-Chat-3B-v1-q4f32_0",
  },
  {
    label: "RedPajama 3B f16",
    name: "RedPajama-INCITE-Chat-3B-v1-q4f16_0",
  },
  {
    label: "Vicuna 7B f32",
    name: "vicuna-v1-7b-q4f32_0",
  },
  {
    label: "Wizard Coder 15B f32",
    name: "WizardCoder-15B-V1.0-q4f32_1",
  },
  {
    label: "Wizard Coder 15B f16",
    name: "WizardCoder-15B-V1.0-q4f16_1",
  },
  {
    label: "Wizard Math 7B f16",
    name: "WizardMath-7B-V1.0-q4f16_1",
  },
  {
    label: "Wizard Math 13B f16",
    name: "WizardMath-13B-V1.0-q4f16_1",
  },
];

export const openAIModels = [
  {
    label: "GPT 3.5 turbo",
    name: "gpt-3.5-turbo",
  },
  {
    label: "GPT 3.5 turbo 16k",
    name: "gpt-3.5-turbo-16k",
  },
];

export const codeString = `
  // Define a basic user object
  class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    
      // Return user's greeting
      greet() {
        return "Hello, my name is" + this.name};
      }
    
      // Check if the user is an adult
      isAdult() {
        return this.age >= 18 ? true : false;
      }
    }
    
    // Create a new user instance
    const user1 = new User('Alice', 25);
    console.log(user1.greet());  // Outputs: Hello, my name is Alice!
  `;
