-- Auth (Better Auth)
CREATE TABLE IF NOT EXISTS "auth_user" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "email_verified" boolean DEFAULT false NOT NULL,
  "image" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "auth_session" (
  "id" text PRIMARY KEY NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "token" text NOT NULL UNIQUE,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "ip_address" text,
  "user_agent" text,
  "user_id" text NOT NULL REFERENCES "auth_user"("id") ON DELETE CASCADE,
  "active_organization_id" text
);

CREATE TABLE IF NOT EXISTS "auth_account" (
  "id" text PRIMARY KEY NOT NULL,
  "account_id" text NOT NULL,
  "provider_id" text NOT NULL,
  "user_id" text NOT NULL REFERENCES "auth_user"("id") ON DELETE CASCADE,
  "access_token" text,
  "refresh_token" text,
  "id_token" text,
  "access_token_expires_at" timestamp with time zone,
  "refresh_token_expires_at" timestamp with time zone,
  "scope" text,
  "password" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "auth_verification" (
  "id" text PRIMARY KEY NOT NULL,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Memberships: migrate user_id to text (fresh DB: drop/recreate FK)
ALTER TABLE "memberships" DROP CONSTRAINT IF EXISTS "memberships_user_id_users_id_fk";
ALTER TABLE "memberships" ALTER COLUMN "user_id" SET DATA TYPE text USING "user_id"::text;

-- Products MVP columns
ALTER TABLE "products" RENAME COLUMN "name" TO "title";
ALTER TABLE "products" DROP COLUMN IF EXISTS "type";
ALTER TABLE "products" DROP COLUMN IF EXISTS "positioning";
ALTER TABLE "products" DROP COLUMN IF EXISTS "structure";
ALTER TABLE "products" DROP COLUMN IF EXISTS "pricing_hints";
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "price_cents" integer DEFAULT 0 NOT NULL;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "thumbnail" varchar(512);
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "checkout_url" varchar(512);

CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_unique" ON "products" ("slug");

-- Sales: Cakto fields
ALTER TABLE "sales" DROP COLUMN IF EXISTS "offer_id";
ALTER TABLE "sales" ADD COLUMN IF NOT EXISTS "cakto_product_id" varchar(128);

-- Drop legacy users (after memberships unlinked — dev only)
DROP TABLE IF EXISTS "users";
