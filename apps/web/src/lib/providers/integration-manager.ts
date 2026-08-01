import { caktoProvider } from "./cakto";

export interface IntegrationStatus {
  name: string;
  connected: boolean;
  error?: string;
}

export class IntegrationManager {
  private static instance: IntegrationManager;

  private constructor() {}

  static getInstance(): IntegrationManager {
    if (!IntegrationManager.instance) {
      IntegrationManager.instance = new IntegrationManager();
    }
    return IntegrationManager.instance;
  }

  async getStatus(): Promise<IntegrationStatus[]> {
    const statuses: IntegrationStatus[] = [];

    // Check Cakto
    try {
      if (caktoProvider) {
        const health = await caktoProvider.health();
        statuses.push({
          name: "cakto",
          connected: health.connected,
          error: health.error,
        });
      } else {
        statuses.push({
          name: "cakto",
          connected: false,
          error: "Not configured",
        });
      }
    } catch (error) {
      statuses.push({
        name: "cakto",
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Add other integrations here (Gamma, Vercel, Google, Reddit, etc.)

    return statuses;
  }

  async testIntegration(name: string): Promise<boolean> {
    switch (name) {
      case "cakto":
        if (!caktoProvider) return false;
        const health = await caktoProvider.health();
        return health.connected;
      default:
        return false;
    }
  }

  isIntegrationAvailable(name: string): boolean {
    switch (name) {
      case "cakto":
        return caktoProvider !== null;
      default:
        return false;
    }
  }

  getIntegration(name: string) {
    switch (name) {
      case "cakto":
        return caktoProvider;
      default:
        return null;
    }
  }
}

export const integrationManager = IntegrationManager.getInstance();
