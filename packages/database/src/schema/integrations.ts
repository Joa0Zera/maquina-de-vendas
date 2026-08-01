import { jsonb, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";

export const integrationProviderEnum = pgEnum("integration_provider", ["cakto"]);

export const integrationStatusEnum = pgEnum("integration_status", [
  "disconnected",
  "pending",
  "connected",
  "error",
]);

export const integrations = pgTable("integrations", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  provider: integrationProviderEnum("provider").notNull(),
  status: integrationStatusEnum("status").notNull().default("disconnected"),
  externalAccountId: varchar("external_account_id", { length: 128 }),
  config: jsonb("config"),
  credentialsRef: varchar("credentials_ref", { length: 256 }),
  ...timestamps,
});

export type Integration = typeof integrations.$inferSelect;
export type NewIntegration = typeof integrations.$inferInsert;
