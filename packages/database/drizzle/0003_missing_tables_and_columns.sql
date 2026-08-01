-- Fecha o gap entre schema.ts e o banco real: várias tabelas e colunas
-- declaradas no schema nunca tinham sido migradas (drift acumulado do MVP phase 1).

CREATE TYPE "public"."cakto_status" AS ENUM('inactive', 'active');--> statement-breakpoint
CREATE TYPE "public"."provider" AS ENUM('cakto');--> statement-breakpoint
CREATE TYPE "public"."ebook_status" AS ENUM('draft', 'generating', 'ready', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."launch_event_type" AS ENUM('PROJECT_CREATED', 'PRODUCT_CREATED', 'TRAFFIC_CREATED', 'COPY_CREATED', 'CAMPAIGN_CREATED', 'OFFER_CREATED', 'EBOOK_CREATED', 'LANDING_CREATED', 'V0_CREATED', 'DEPLOY_CREATED', 'CHECKOUT_CREATED', 'SALE_RECEIVED', 'ORGANIC_CREATED', 'INTELLIGENCE_CREATED');--> statement-breakpoint
CREATE TYPE "public"."project_factory_job_status" AS ENUM('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');--> statement-breakpoint

ALTER TABLE "offers" ADD COLUMN IF NOT EXISTS "cakto_product_id" text;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN IF NOT EXISTS "cakto_checkout_url" varchar(512);--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN IF NOT EXISTS "cakto_status" "cakto_status";--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN IF NOT EXISTS "cakto_created_at" timestamp;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN IF NOT EXISTS "cakto_offer_id" text;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN IF NOT EXISTS "cakto_offer_status" text;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN IF NOT EXISTS "cakto_synced_at" timestamp;--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "integration_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"provider" "provider" NOT NULL,
	"client_id" text NOT NULL,
	"client_secret" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "ebooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"offer_id" uuid NOT NULL REFERENCES "offers"("id") ON DELETE CASCADE,
	"title" varchar(280) NOT NULL,
	"subtitle" varchar(560),
	"structure" jsonb,
	"status" "ebook_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "copy_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
	"headlines" jsonb DEFAULT '[]' NOT NULL,
	"ad_copies" jsonb DEFAULT '[]' NOT NULL,
	"ugc_scripts" jsonb DEFAULT '[]' NOT NULL,
	"ctas" jsonb DEFAULT '[]' NOT NULL,
	"email_sequence" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "copy_assets_organization_id_idx" ON "copy_assets" ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "copy_assets_product_id_idx" ON "copy_assets" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "copy_assets_created_at_idx" ON "copy_assets" ("created_at");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "intelligence_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
	"score" integer DEFAULT 0 NOT NULL,
	"strengths" jsonb DEFAULT '[]' NOT NULL,
	"weaknesses" jsonb DEFAULT '[]' NOT NULL,
	"recommendations" jsonb DEFAULT '[]' NOT NULL,
	"bottlenecks" jsonb DEFAULT '[]' NOT NULL,
	"opportunities" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "intelligence_reports_organization_id_idx" ON "intelligence_reports" ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "intelligence_reports_product_id_idx" ON "intelligence_reports" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "intelligence_reports_created_at_idx" ON "intelligence_reports" ("created_at");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "launch_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
	"event_type" "launch_event_type" NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "launch_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
	"visits" integer DEFAULT 0 NOT NULL,
	"checkouts" integer DEFAULT 0 NOT NULL,
	"sales" integer DEFAULT 0 NOT NULL,
	"revenue" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "organic_distribution" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
	"facebook_groups" jsonb DEFAULT '[]' NOT NULL,
	"whatsapp_groups" jsonb DEFAULT '[]' NOT NULL,
	"telegram_groups" jsonb DEFAULT '[]' NOT NULL,
	"discord_communities" jsonb DEFAULT '[]' NOT NULL,
	"hashtags" jsonb DEFAULT '[]' NOT NULL,
	"forums" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organic_distribution_organization_id_idx" ON "organic_distribution" ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organic_distribution_product_id_idx" ON "organic_distribution" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organic_distribution_created_at_idx" ON "organic_distribution" ("created_at");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "project_factory_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
	"status" "project_factory_job_status" DEFAULT 'PENDING' NOT NULL,
	"current_step" text,
	"started_at" timestamp,
	"finished_at" timestamp,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "traffic_research" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
	"product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
	"keywords" jsonb DEFAULT '[]' NOT NULL,
	"communities" jsonb DEFAULT '[]' NOT NULL,
	"youtube_channels" jsonb DEFAULT '[]' NOT NULL,
	"competitors" jsonb DEFAULT '[]' NOT NULL,
	"ad_angles" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "traffic_research_organization_id_idx" ON "traffic_research" ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "traffic_research_product_id_idx" ON "traffic_research" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "traffic_research_created_at_idx" ON "traffic_research" ("created_at");
