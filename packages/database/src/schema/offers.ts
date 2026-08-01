import { index, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const offerStatusEnum = pgEnum("offer_status", [
  "draft",
  "generating",
  "ready",
  "published",
  "archived",
]);

export const caktoStatusEnum = pgEnum("cakto_status", [
  "inactive",
  "active",
]);

export const offers = pgTable("offers", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 160 }).notNull(),
  headline: varchar("headline", { length: 280 }),
  copy: jsonb("copy"),
  pricing: jsonb("pricing"),
  status: offerStatusEnum("status").notNull().default("draft"),
  caktoProductId: text("cakto_product_id"),
  caktoCheckoutUrl: varchar("cakto_checkout_url", { length: 512 }),
  caktoStatus: caktoStatusEnum("cakto_status"),
  caktoCreatedAt: timestamp("cakto_created_at"),
  caktoOfferId: text("cakto_offer_id"),
  caktoOfferStatus: text("cakto_offer_status"),
  caktoSyncedAt: timestamp("cakto_synced_at"),
  ...timestamps,
}, (table) => [
  index("offers_organization_id_idx").on(table.organizationId),
  index("offers_product_id_idx").on(table.productId),
  index("offers_status_idx").on(table.status),
  index("offers_created_at_idx").on(table.createdAt),
]);

export type Offer = typeof offers.$inferSelect;
export type NewOffer = typeof offers.$inferInsert;
