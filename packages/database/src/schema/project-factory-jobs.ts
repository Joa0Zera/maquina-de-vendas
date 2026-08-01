import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers.js";
import { organizations } from "./organizations.js";
import { products } from "./products.js";

export const projectFactoryJobStatusEnum = pgEnum("project_factory_job_status", [
  "PENDING",
  "RUNNING",
  "COMPLETED",
  "FAILED",
]);

export const projectFactoryJobs = pgTable("project_factory_jobs", {
  id: id(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  status: projectFactoryJobStatusEnum("status").notNull().default("PENDING"),
  currentStep: text("current_step"),
  startedAt: timestamp("started_at"),
  finishedAt: timestamp("finished_at"),
  error: text("error"),
  ...timestamps,
});

export type ProjectFactoryJob = typeof projectFactoryJobs.$inferSelect;
export type NewProjectFactoryJob = typeof projectFactoryJobs.$inferInsert;
