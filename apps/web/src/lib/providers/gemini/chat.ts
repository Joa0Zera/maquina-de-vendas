import { GeminiClient } from "./client";

export class GeminiChat {
  private client: GeminiClient;
  private history: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  constructor(client: GeminiClient) {
    this.client = client;
  }

  async sendMessage(
    message: string,
    options?: {
      temperature?: number;
      maxOutputTokens?: number;
      systemInstruction?: string;
    }
  ): Promise<{ text: string; usage?: any }> {
    // Add user message to history
    this.history.push({
      role: "user",
      parts: [{ text: message }],
    });

    try {
      const result = await this.client.generateContent(message, options);

      // Add assistant response to history
      this.history.push({
        role: "model",
        parts: [{ text: result.text }],
      });

      return result;
    } catch (error) {
      // Remove user message from history if failed
      this.history.pop();
      throw error;
    }
  }

  getHistory(): Array<{ role: string; parts: Array<{ text: string }> }> {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }

  reset(): void {
    this.clearHistory();
  }
}
