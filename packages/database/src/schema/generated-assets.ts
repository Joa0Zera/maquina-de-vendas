import { jsonb, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";

export const platformModuleEnum = pgEnum("platform_module", [
  "trend_engine",
  "product_factory",
  "landing_generator",
  "campaign_engine",
  "checkout",
  "analytics",
]);

export const assetTypeEnum = pgEnum("asset_type", [
  "trend_report",
  "ebook",
  "offer_copy",
  "landing_section",
  "ad_creative",
  "hook",
  "vsl_script",
  "testimonial",
  "other",
]);

export const generatedAssets = pgTable("generated_assets", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  module: platformModuleEnum("module").notNull(),
  entityType: varchar("entity_type", { length: 64 }),
  entityId: uuid("entity_id"),
  assetType: assetTypeEnum("asset_type").notNull(),
  title: varchar("title", { length: 200 }),
  content: jsonb("content").notNull(),
  model: varchar("model", { length: 80 }),
  promptHash: varchar("prompt_hash", { length: 64 }),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export type GeneratedAsset = typeof generatedAssets.$inferSelect;
export type NewGeneratedAsset = typeof generatedAssets.$inferInsert;
