import { jsonb, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { offers } from "./offers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const campaignPlatformEnum = pgEnum("campaign_platform", [
  "meta",
  "tiktok",
  "google",
  "youtube",
  "organic",
  "other",
]);

export const campaignStatusEnum = pgEnum("campaign_status", [
  "draft",
  "generating",
  "ready",
  "active",
  "paused",
  "archived",
]);

export const campaigns = pgTable("campaigns", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  offerId: uuid("offer_id").references(() => offers.id, { onDelete: "set null" }),
  name: varchar("name", { length: 160 }).notNull(),
  platform: campaignPlatformEnum("platform").notNull().default("meta"),
  status: campaignStatusEnum("status").notNull().default("draft"),
  angles: jsonb("angles"),
  hooks: jsonb("hooks"),
  creatives: jsonb("creatives"),
  variations: jsonb("variations"),
  campaignName: text("campaign_name"),
  objective: jsonb("objective").$type<{ objective: string }>(),
  audiences: jsonb("audiences").$type<Array<{ name: string; reason: string }>>(),
  interests: jsonb("interests").$type<string[]>(),
  adSets: jsonb("ad_sets").$type<Array<{ name: string; focus: string }>>(),
  ...timestamps,
});

export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;
