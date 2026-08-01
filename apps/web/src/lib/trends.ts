import { db, trends } from "@maquina/database";
import { and, desc, eq } from "drizzle-orm";

export async function listTrendsByOrganization(organizationId: string) {
  return db
    .select()
    .from(trends)
    .where(eq(trends.organizationId, organizationId))
    .orderBy(desc(trends.discoveredAt));
}

export async function getTrendById(id: string, organizationId: string) {
  const [row] = await db
    .select()
    .from(trends)
    .where(and(eq(trends.id, id), eq(trends.organizationId, organizationId)))
    .limit(1);
  return row ?? null;
}

export function trendToFormValues(trend: typeof trends.$inferSelect) {
  return {
    title: trend.title,
    summary: trend.summary ?? "",
    source: trend.source,
    opportunityScore: trend.opportunityScore?.toString() ?? "",
  };
}

export function formToTrendValues(input: {
  title: string;
  summary?: string;
  source: "reddit" | "tiktok" | "manual";
  opportunityScore?: number;
}) {
  return {
    title: input.title,
    summary: input.summary || null,
    source: input.source,
    opportunityScore: input.opportunityScore || null,
  };
}
