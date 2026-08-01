-- Mais drift entre schema.ts e o banco, achado ao auditar todas as tabelas
-- de uma vez (packages/database/schema-diff.ts).

ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "campaign_name" text;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "objective" jsonb;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "audiences" jsonb;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "interests" jsonb;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "ad_sets" jsonb;--> statement-breakpoint

CREATE TYPE "public"."v0_status" AS ENUM('pending', 'generated', 'deployed');--> statement-breakpoint
CREATE TYPE "public"."deployment_status" AS ENUM('pending', 'deployed', 'failed');--> statement-breakpoint

ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "v0_prompt" text;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "v0_status" "v0_status";--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "v0_project_url" varchar(512);--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "v0_generated_at" timestamp;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "deployment_url" varchar(512);--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "deployment_status" "deployment_status";--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN IF NOT EXISTS "deployed_at" timestamp;
