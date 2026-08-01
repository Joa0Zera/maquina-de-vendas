import { pgTable, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";

export const organizations = pgTable("organizations", {
  id: id(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  ...timestamps,
});

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
