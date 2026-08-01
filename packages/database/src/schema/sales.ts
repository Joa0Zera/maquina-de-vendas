import { integer, jsonb, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const saleStatusEnum = pgEnum("sale_status", [
  "pending",
  "approved",
  "refunded",
  "chargedback",
  "cancelled",
]);

export const sales = pgTable("sales", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  externalSaleId: varchar("external_sale_id", { length: 128 }).notNull(),
  caktoProductId: varchar("cakto_product_id", { length: 128 }),
  amountCents: integer("amount_cents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("BRL"),
  status: saleStatusEnum("status").notNull().default("pending"),
  buyerEmail: varchar("buyer_email", { length: 255 }),
  metadata: jsonb("metadata"),
  soldAt: timestamp("sold_at", { withTimezone: true }).notNull().defaultNow(),
  ...timestamps,
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
