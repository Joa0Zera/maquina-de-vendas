import { AIProvider, AIOptions } from "./types";
import { GeminiProvider } from "./gemini";

class AIProviderManager {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = "gemini";

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders(): void {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (geminiApiKey) {
      const geminiProvider = new GeminiProvider(geminiApiKey);
      this.providers.set("gemini", geminiProvider);
    }
  }

  registerProvider(name: string, provider: AIProvider): void {
    this.providers.set(name, provider);
  }

  getProvider(name?: string): AIProvider | undefined {
    const providerName = name ?? this.defaultProvider;
    return this.providers.get(providerName);
  }

  setDefaultProvider(name: string): void {
    if (this.providers.has(name)) {
      this.defaultProvider = name;
    } else {
      throw new Error(`Provider ${name} not found`);
    }
  }

  async generate(prompt: string, options?: AIOptions & { provider?: string }): Promise<string> {
    const provider = this.getProvider(options?.provider);
    
    if (!provider) {
      throw new Error("No AI provider available. Please configure GEMINI_API_KEY in .env.local");
    }

    return provider.generate(prompt, options);
  }

  async test(providerName?: string): Promise<boolean> {
    const provider = this.getProvider(providerName);
    
    if (!provider) {
      return false;
    }

    return provider.test();
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  isProviderAvailable(name: string): boolean {
    return this.providers.has(name);
  }
}

// Singleton instance
export const aiProvider = new AIProviderManager();
