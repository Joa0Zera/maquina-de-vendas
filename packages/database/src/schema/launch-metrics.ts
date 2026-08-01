import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const launchMetrics = pgTable("launch_metrics", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  visits: integer("visits").notNull().default(0),
  checkouts: integer("checkouts").notNull().default(0),
  sales: integer("sales").notNull().default(0),
  revenue: integer("revenue").notNull().default(0),
  ...timestamps,
});

export type LaunchMetrics = typeof launchMetrics.$inferSelect;
export type NewLaunchMetrics = typeof launchMetrics.$inferInsert;
