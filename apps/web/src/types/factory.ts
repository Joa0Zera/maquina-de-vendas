export interface FactoryInput {
  organizationId: string;
  trendId?: string;
  theme?: string;
  category?: string;
  priceCents?: number;
}

export interface FactoryResult {
  productId: string;
  steps: FactoryStep[];
}

export interface FactoryStep {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  error?: string;
}
