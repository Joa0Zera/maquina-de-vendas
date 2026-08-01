import Anthropic from "@anthropic-ai/sdk";
import { AIProvider, AIOptions } from "./types";

const DEFAULT_MODEL = "claude-sonnet-4-5-20250929";

export class ClaudeProvider implements AIProvider {
  name = "Claude";
  private client: Anthropic | null = null;
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.initialize(apiKey);
    }
  }

  initialize(apiKey: string): void {
    this.apiKey = apiKey;
    this.client = new Anthropic({ apiKey });
  }

  async generate(prompt: string, options?: AIOptions): Promise<string> {
    if (!this.client) {
      throw new Error("Claude provider not initialized. Please set ANTHROPIC_API_KEY in .env.local");
    }

    try {
      const message = await this.client.messages.create({
        model: options?.model ?? DEFAULT_MODEL,
        max_tokens: options?.maxTokens ?? 2048,
        temperature: options?.temperature ?? 0.7,
        system: options?.systemPrompt,
        messages: [{ role: "user", content: prompt }],
      });

      const textBlock = message.content.find((block) => block.type === "text");
      return textBlock && textBlock.type === "text" ? textBlock.text : "";
    } catch (error) {
      console.error("Claude generation error:", error);
      throw new Error("Failed to generate content with Claude");
    }
  }

  async test(): Promise<boolean> {
    if (!this.client) {
      return false;
    }

    try {
      const message = await this.client.messages.create({
        model: DEFAULT_MODEL,
        max_tokens: 8,
        messages: [{ role: "user", content: "Olá" }],
      });

      return message.content.length > 0;
    } catch (error) {
      console.error("Claude test error:", error);
      return false;
    }
  }

  isInitialized(): boolean {
    return this.client !== null && this.apiKey !== null;
  }

  getApiKey(): string | null {
    return this.apiKey;
  }
}
