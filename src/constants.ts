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
    label: "Llama 3.2 1B Instruct",
    name: "Llama-3.2-1B-Instruct-q4f32_1-MLC",
  },
  {
    label: "Llama 3.2 3B Instruct",
    name: "Llama-3.2-3B-Instruct-q4f32_1-MLC",
  },
  {
    label: "Llama 3.1 8B Instruct",
    name: "Llama-3.1-8B-Instruct-q4f32_1-MLC",
  },
  {
    label: "Phi-3.5 Mini Instruct",
    name: "Phi-3.5-mini-instruct-q4f32_1-MLC",
  },
  {
    label: "Mistral 7B Instruct v0.3",
    name: "Mistral-7B-Instruct-v0.3-q4f32_1-MLC",
  },
  {
    label: "Qwen2.5 3B Instruct",
    name: "Qwen2.5-3B-Instruct-q4f32_1-MLC",
  },
  {
    label: "Qwen2.5 7B Instruct",
    name: "Qwen2.5-7B-Instruct-q4f32_1-MLC",
  },
  {
    label: "SmolLM2 1.7B Instruct",
    name: "SmolLM2-1.7B-Instruct-q4f32_1-MLC",
  },
  {
    label: "Gemma 2 2B IT",
    name: "gemma-2-2b-it-q4f32_1-MLC",
  },
  {
    label: "RedPajama 3B Chat",
    name: "RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC",
  },
  {
    label: "TinyLlama 1.1B Chat v1.0",
    name: "TinyLlama-1.1B-Chat-v1.0-q4f32_1-MLC",
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
