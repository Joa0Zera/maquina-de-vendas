import { db, campaigns, products, sales } from "@maquina/database";
import { eq, sql } from "drizzle-orm";
import { Hono } from "hono";

export const analyticsRoutes = new Hono();

analyticsRoutes.get("/overview", async (c) => {
  const organizationId = c.req.query("organizationId");

  const productCount = organizationId
    ? await db
        .select({ count: sql<number>`count(*)::int` })
        .from(products)
        .where(eq(products.organizationId, organizationId))
    : await db.select({ count: sql<number>`count(*)::int` }).from(products);

  const campaignCount = organizationId
    ? await db
        .select({ count: sql<number>`count(*)::int` })
        .from(campaigns)
        .where(eq(campaigns.organizationId, organizationId))
    : await db.select({ count: sql<number>`count(*)::int` }).from(campaigns);

  const revenue = organizationId
    ? await db
        .select({
          totalCents: sql<number>`coalesce(sum(${sales.amountCents}), 0)::int`,
        })
        .from(sales)
        .where(eq(sales.organizationId, organizationId))
    : await db.select({
        totalCents: sql<number>`coalesce(sum(${sales.amountCents}), 0)::int`,
      }).from(sales);

  return c.json({
    module: "analytics",
    data: {
      products: productCount[0]?.count ?? 0,
      campaigns: campaignCount[0]?.count ?? 0,
      revenueCents: revenue[0]?.totalCents ?? 0,
      conversionRate: null,
    },
  });
});
