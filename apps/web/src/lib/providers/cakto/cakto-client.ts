import { CaktoConfig, CaktoHealthResponse, CaktoError } from "./types";

export class CaktoClient {
  private config: CaktoConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(config: CaktoConfig) {
    this.config = config;
  }

  private async ensureAuthenticated(): Promise<void> {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return;
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/public_api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 minute before expiry
    } catch (error) {
      console.error("Cakto authentication error:", error);
      throw new Error("Failed to authenticate with Cakto");
    }
  }

  public async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    await this.ensureAuthenticated();

    const url = `${this.config.baseUrl}${endpoint}`;
    const timeout = 15000;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.accessToken}`,
          ...options.headers,
        },
        signal: AbortSignal.timeout(timeout),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      console.error("Cakto request error:", error);
      throw error;
    }
  }

  async health(): Promise<CaktoHealthResponse> {
    try {
      await this.ensureAuthenticated();
      
      const response = await this.request<CaktoHealthResponse>("/health");
      return {
        connected: true,
        account: response.account,
        products: response.products,
      };
    } catch (error) {
      console.error("Cakto health check error:", error);
      return {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getAccessToken(): Promise<string | null> {
    await this.ensureAuthenticated();
    return this.accessToken;
  }

  getConfig(): CaktoConfig {
    return this.config;
  }

  isConnected(): boolean {
    return this.accessToken !== null;
  }
}
