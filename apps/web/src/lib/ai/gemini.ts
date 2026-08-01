import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { AIProvider, AIOptions, AIResponse } from "./types";

export class GeminiProvider implements AIProvider {
  name = "Gemini";
  private client: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.initialize(apiKey);
    }
  }

  initialize(apiKey: string): void {
    this.apiKey = apiKey;
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async generate(prompt: string, options?: AIOptions): Promise<string> {
    if (!this.model || !this.apiKey) {
      throw new Error("Gemini provider not initialized. Please set GEMINI_API_KEY in .env.local");
    }

    try {
      const generationConfig = {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 2048,
      };

      const systemInstruction = options?.systemPrompt;

      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        systemInstruction,
      });

      const response = result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error("Gemini generation error:", error);
      throw new Error("Failed to generate content with Gemini");
    }
  }

  async test(): Promise<boolean> {
    if (!this.model || !this.apiKey) {
      return false;
    }

    try {
      const result = await this.model.generateContent("Olá");
      const response = result.response;
      return response.text() !== undefined;
    } catch (error) {
      console.error("Gemini test error:", error);
      return false;
    }
  }

  isInitialized(): boolean {
    return this.client !== null && this.model !== null && this.apiKey !== null;
  }

  getApiKey(): string | null {
    return this.apiKey;
  }
}
