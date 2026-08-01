import { index, jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const organicDistribution = pgTable("organic_distribution", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  facebookGroups: jsonb("facebook_groups").notNull().$type<any[]>().default([]),
  whatsappGroups: jsonb("whatsapp_groups").notNull().$type<any[]>().default([]),
  telegramGroups: jsonb("telegram_groups").notNull().$type<any[]>().default([]),
  discordCommunities: jsonb("discord_communities").notNull().$type<any[]>().default([]),
  hashtags: jsonb("hashtags").notNull().$type<string[]>().default([]),
  forums: jsonb("forums").notNull().$type<any[]>().default([]),
  ...timestamps,
}, (table) => [
  index("organic_distribution_organization_id_idx").on(table.organizationId),
  index("organic_distribution_product_id_idx").on(table.productId),
  index("organic_distribution_created_at_idx").on(table.createdAt),
]);

export type OrganicDistribution = typeof organicDistribution.$inferSelect;
export type NewOrganicDistribution = typeof organicDistribution.$inferInsert;
