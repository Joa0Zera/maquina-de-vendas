import { index, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";

export const trendSourceEnum = pgEnum("trend_source", ["reddit", "tiktok", "manual"]);

export type TrendSource = "reddit" | "tiktok" | "manual";

export const trends = pgTable("trends", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  source: trendSourceEnum("source").notNull(),
  externalId: varchar("external_id", { length: 128 }),
  title: varchar("title", { length: 280 }).notNull(),
  summary: text("summary"),
  opportunityScore: integer("opportunity_score"),
  metadata: jsonb("metadata"),
  discoveredAt: timestamp("discovered_at", { withTimezone: true }).notNull().defaultNow(),
  ...timestamps,
}, (table) => [
  index("trends_organization_id_idx").on(table.organizationId),
  index("trends_source_idx").on(table.source),
  index("trends_discovered_at_idx").on(table.discoveredAt),
  index("trends_created_at_idx").on(table.createdAt),
]);

export type Trend = typeof trends.$inferSelect;
export type NewTrend = typeof trends.$inferInsert;
