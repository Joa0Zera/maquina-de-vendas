import { AIProvider, AIOptions } from "./types";
import { GeminiProvider } from "./gemini";
import { ClaudeProvider } from "./claude";

class AIProviderManager {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = "gemini";

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders(): void {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      this.providers.set("gemini", new GeminiProvider(geminiApiKey));
    }

    // Pronto para uso quando fizer sentido migrar: basta setar
    // ANTHROPIC_API_KEY e trocar defaultProvider para "claude".
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicApiKey) {
      this.providers.set("claude", new ClaudeProvider(anthropicApiKey));
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
