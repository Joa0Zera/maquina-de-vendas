import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const launchEventTypeEnum = pgEnum("launch_event_type", [
  "PROJECT_CREATED",
  "PRODUCT_CREATED",
  "TRAFFIC_CREATED",
  "COPY_CREATED",
  "CAMPAIGN_CREATED",
  "OFFER_CREATED",
  "EBOOK_CREATED",
  "LANDING_CREATED",
  "V0_CREATED",
  "DEPLOY_CREATED",
  "CHECKOUT_CREATED",
  "SALE_RECEIVED",
  "ORGANIC_CREATED",
  "INTELLIGENCE_CREATED",
]);

export const launchEvents = pgTable("launch_events", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  eventType: launchEventTypeEnum("event_type").notNull(),
  description: text("description"),
  ...timestamps,
});

export type LaunchEvent = typeof launchEvents.$inferSelect;
export type NewLaunchEvent = typeof launchEvents.$inferInsert;
