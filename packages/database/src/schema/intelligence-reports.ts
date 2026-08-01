import { index, integer, jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const intelligenceReports = pgTable("intelligence_reports", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  score: integer("score").notNull().default(0),
  strengths: jsonb("strengths").notNull().$type<string[]>().default([]),
  weaknesses: jsonb("weaknesses").notNull().$type<string[]>().default([]),
  recommendations: jsonb("recommendations").notNull().$type<string[]>().default([]),
  bottlenecks: jsonb("bottlenecks").notNull().$type<string[]>().default([]),
  opportunities: jsonb("opportunities").notNull().$type<string[]>().default([]),
  ...timestamps,
}, (table) => [
  index("intelligence_reports_organization_id_idx").on(table.organizationId),
  index("intelligence_reports_product_id_idx").on(table.productId),
  index("intelligence_reports_created_at_idx").on(table.createdAt),
]);

export type IntelligenceReport = typeof intelligenceReports.$inferSelect;
export type NewIntelligenceReport = typeof intelligenceReports.$inferInsert;
