import { index, jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const copyAssets = pgTable("copy_assets", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  headlines: jsonb("headlines").notNull().$type<Array<{ headline: string; type: string }>>().default([]),
  adCopies: jsonb("ad_copies").notNull().$type<Array<{ headline: string; primaryText: string; cta: string }>>().default([]),
  ugcScripts: jsonb("ugc_scripts").notNull().$type<Array<{ hook: string; problem: string; solution: string; cta: string }>>().default([]),
  ctas: jsonb("ctas").notNull().$type<string[]>().default([]),
  emailSequence: jsonb("email_sequence").notNull().$type<Array<{ subject: string; body: string }>>().default([]),
  ...timestamps,
}, (table) => [
  index("copy_assets_organization_id_idx").on(table.organizationId),
  index("copy_assets_product_id_idx").on(table.productId),
  index("copy_assets_created_at_idx").on(table.createdAt),
]);

export type CopyAssets = typeof copyAssets.$inferSelect;
export type NewCopyAssets = typeof copyAssets.$inferInsert;
