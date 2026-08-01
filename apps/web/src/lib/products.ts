import { db, products, sales } from "@maquina/database";
import { and, desc, eq, sql } from "drizzle-orm";

export async function listProductsByOrganization(organizationId: string) {
  return db
    .select()
    .from(products)
    .where(eq(products.organizationId, organizationId))
    .orderBy(desc(products.createdAt));
}

export async function getProductById(id: string, organizationId: string) {
  const [row] = await db
    .select()
    .from(products)
    .where(and(eq(products.id, id), eq(products.organizationId, organizationId)))
    .limit(1);
  return row ?? null;
}

export async function getPublishedProductBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.status, "published")))
    .limit(1);
  return row ?? null;
}

export async function getOrganizationMetrics(organizationId: string) {
  const [productStats] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.organizationId, organizationId));

  const [revenueStats] = await db
    .select({
      totalCents: sql<number>`coalesce(sum(${sales.amountCents}), 0)::int`,
      count: sql<number>`count(*)::int`,
    })
    .from(sales)
    .where(
      and(eq(sales.organizationId, organizationId), eq(sales.status, "approved")),
    );

  const publishedCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(
      and(
        eq(products.organizationId, organizationId),
        eq(products.status, "published"),
      ),
    );

  const productCount = productStats?.count ?? 0;
  const published = publishedCount[0]?.count ?? 0;
  const revenueCents = revenueStats?.totalCents ?? 0;
  const salesCount = revenueStats?.count ?? 0;
  const conversionRate =
    published > 0 && salesCount > 0
      ? Math.round((salesCount / published) * 100) / 100
      : null;

  return {
    products: productCount,
    published,
    revenueCents,
    salesCount,
    conversionRate,
  };
}

export function productToFormValues(product: typeof products.$inferSelect) {
  return {
    title: product.title,
    slug: product.slug,
    description: product.description ?? "",
    price: product.priceCents / 100,
    thumbnail: product.thumbnail ?? "",
    status: product.status,
    checkoutUrl: product.checkoutUrl ?? "",
  };
}

export function formToProductValues(input: {
  title: string;
  slug: string;
  description?: string;
  price: number;
  thumbnail?: string;
  status: "draft" | "published" | "archived";
  checkoutUrl?: string;
}) {
  return {
    title: input.title,
    slug: input.slug,
    description: input.description || null,
    priceCents: Math.round(input.price * 100),
    thumbnail: input.thumbnail || null,
    status: input.status,
    checkoutUrl: input.checkoutUrl || null,
  };
}
