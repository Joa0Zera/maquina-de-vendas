import {
  analyticsOverviewSchema,
  healthResponseSchema,
  type HealthResponse,
} from "@maquina/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_URL}/health`, { next: { revalidate: 10 } });
  if (!res.ok) throw new Error("API indisponível");
  const json: unknown = await res.json();
  return healthResponseSchema.parse(json);
}

export async function fetchAnalyticsOverview(organizationId?: string) {
  const query = organizationId ? `?organizationId=${organizationId}` : "";
  const res = await fetch(`${API_URL}/analytics/overview${query}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error("Analytics indisponível");
  const json: unknown = await res.json();
  const parsed = analyticsOverviewSchema.parse(json);
  return parsed.data;
}
