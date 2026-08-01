import { jsonb, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { offers } from "./offers.js";

export const ebookStatusEnum = pgEnum("ebook_status", [
  "draft",
  "generating",
  "ready",
  "published",
  "archived",
]);

export const ebooks = pgTable("ebooks", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  offerId: uuid("offer_id")
    .notNull()
    .references(() => offers.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 280 }).notNull(),
  subtitle: varchar("subtitle", { length: 560 }),
  structure: jsonb("structure"),
  status: ebookStatusEnum("status").notNull().default("draft"),
  ...timestamps,
});

export type Ebook = typeof ebooks.$inferSelect;
export type NewEbook = typeof ebooks.$inferInsert;
