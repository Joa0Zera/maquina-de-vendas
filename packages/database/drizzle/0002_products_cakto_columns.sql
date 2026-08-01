ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "cakto_product_id" text;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "cakto_synced_at" timestamp;
