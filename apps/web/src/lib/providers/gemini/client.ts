import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export class GeminiClient {
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

  isInitialized(): boolean {
    return this.client !== null && this.model !== null && this.apiKey !== null;
  }

  getModel(): GenerativeModel | null {
    return this.model;
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async generateContent(prompt: string, options?: {
    temperature?: number;
    maxOutputTokens?: number;
    systemInstruction?: string;
  }): Promise<{ text: string; usage?: any }> {
    if (!this.model || !this.apiKey) {
      throw new Error("Gemini client not initialized. Please set GEMINI_API_KEY in .env.local");
    }

    try {
      const generationConfig = {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxOutputTokens ?? 2048,
      };

      const systemInstruction = options?.systemInstruction;

      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        systemInstruction,
      });

      const response = result.response;
      const text = response.text();
      const usage = response.usageMetadata;

      return { text, usage };
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
}
