import { index, jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const trafficResearch = pgTable("traffic_research", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  keywords: jsonb("keywords").notNull().$type<string[]>().default([]),
  communities: jsonb("communities").notNull().$type<Array<{ name: string; platform: string }>>().default([]),
  youtubeChannels: jsonb("youtube_channels").notNull().$type<Array<{ name: string; topic: string }>>().default([]),
  competitors: jsonb("competitors").notNull().$type<Array<{ name: string; reason: string }>>().default([]),
  adAngles: jsonb("ad_angles").notNull().$type<Array<{ headline: string; angle: string }>>().default([]),
  ...timestamps,
}, (table) => [
  index("traffic_research_organization_id_idx").on(table.organizationId),
  index("traffic_research_product_id_idx").on(table.productId),
  index("traffic_research_created_at_idx").on(table.createdAt),
]);

export type TrafficResearch = typeof trafficResearch.$inferSelect;
export type NewTrafficResearch = typeof trafficResearch.$inferInsert;
