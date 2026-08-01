interface CacheEntry {
  response: string;
  timestamp: number;
  tokens: number;
}

class AICache {
  private cache: Map<string, CacheEntry> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(ttl?: number) {
    if (ttl) {
      this.defaultTTL = ttl;
    }
  }

  private generateKey(message: string, context?: any): string {
    const contextStr = context ? JSON.stringify(context) : "";
    return `${message}:${contextStr}`;
  }

  get(message: string, context?: any): string | null {
    const key = this.generateKey(message, context);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.defaultTTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.response;
  }

  set(message: string, response: string, context?: any, tokens?: number): void {
    const key = this.generateKey(message, context);
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
      tokens: tokens || 0,
    });
  }

  clear(): void {
    this.cache.clear();
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.defaultTTL) {
        this.cache.delete(key);
      }
    }
  }

  size(): number {
    return this.cache.size;
  }

  getStats(): { size: number; totalTokens: number } {
    let totalTokens = 0;
    for (const entry of this.cache.values()) {
      totalTokens += entry.tokens;
    }
    return {
      size: this.cache.size,
      totalTokens,
    };
  }
}

// Singleton instance
export const aiCache = new AICache();
