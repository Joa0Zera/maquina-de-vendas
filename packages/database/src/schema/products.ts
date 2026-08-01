import { index, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "published",
  "archived",
]);

export const products = pgTable(
  "products",
  {
    id: id(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 80 }).notNull(),
    description: text("description"),
    priceCents: integer("price_cents").notNull().default(0),
    thumbnail: varchar("thumbnail", { length: 512 }),
    status: productStatusEnum("status").notNull().default("draft"),
    checkoutUrl: varchar("checkout_url", { length: 512 }),
    caktoProductId: text("cakto_product_id"),
    caktoSyncedAt: timestamp("cakto_synced_at"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("products_slug_unique").on(table.slug),
    index("products_organization_id_idx").on(table.organizationId),
    index("products_status_idx").on(table.status),
    index("products_created_at_idx").on(table.createdAt),
  ],
);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
