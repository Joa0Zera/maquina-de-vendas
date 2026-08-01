import { db, integrationSettings, sales, products } from "@maquina/database";
import { and, eq, gte, sql } from "drizzle-orm";

export interface CaktoProduct {
  id: string;
  name: string;
  price: number;
  status: string;
}

export interface CaktoOfferResponse {
  id: string;
  name: string;
  price: number;
  status: string;
  checkoutUrl?: string;
}

export interface CaktoMetrics {
  revenueToday: number;
  salesToday: number;
  productsCount: number;
  averageTicket: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  sales: number;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  score: number;
  status: string;
  revenue: number;
  sales: number;
  averageTicket: number;
}

export async function getCaktoAccessToken(organizationId: string): Promise<string> {
  const [integration] = await db
    .select()
    .from(integrationSettings)
    .where(
      and(
        eq(integrationSettings.organizationId, organizationId),
        eq(integrationSettings.provider, "cakto")
      )
    )
    .limit(1);

  if (!integration) {
    throw new Error("Cakto integration not found");
  }

  const response = await fetch("https://api.cakto.com.br/public_api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: integration.clientId,
      client_secret: integration.clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get Cakto access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function listCaktoProducts(organizationId: string): Promise<CaktoProduct[]> {
  const accessToken = await getCaktoAccessToken(organizationId);

  const response = await fetch("https://api.cakto.com.br/public_api/products", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to list Cakto products");
  }

  const data = await response.json();
  return data.results || data;
}

export async function createCaktoProduct(
  organizationId: string,
  productData: {
    name: string;
    description?: string;
    price: number;
  }
): Promise<CaktoProduct> {
  const accessToken = await getCaktoAccessToken(organizationId);

  const response = await fetch("https://api.cakto.com.br/public_api/products/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: productData.name,
      description: productData.description || productData.name,
      price: productData.price,
      type: "unique",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Cakto product");
  }

  return response.json();
}

export async function createCaktoOffer(
  organizationId: string,
  offerData: {
    name: string;
    price: number;
    caktoProductId: string;
  }
): Promise<CaktoOfferResponse> {
  const accessToken = await getCaktoAccessToken(organizationId);

  const response = await fetch("https://api.cakto.com.br/public_api/offers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: offerData.name,
      price: offerData.price,
      product: offerData.caktoProductId,
      status: "active",
      type: "unique",
      intervalType: "lifetime",
      interval: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Cakto offer");
  }

  const data = await response.json();
  // A resposta de POST /public_api/offers/ não inclui a URL de checkout.
  // Por padrão da Cakto, o checkout público fica em https://pay.cakto.com.br/{id_da_oferta}.
  return { ...data, checkoutUrl: `https://pay.cakto.com.br/${data.id}` };
}

export async function hasCaktoIntegration(organizationId: string): Promise<boolean> {
  const [integration] = await db
    .select()
    .from(integrationSettings)
    .where(
      and(
        eq(integrationSettings.organizationId, organizationId),
        eq(integrationSettings.provider, "cakto")
      )
    )
    .limit(1);

  return !!integration;
}

export async function getCaktoMetrics(organizationId: string): Promise<CaktoMetrics> {
  const hasIntegration = await hasCaktoIntegration(organizationId);

  if (!hasIntegration) {
    return {
      revenueToday: 0,
      salesToday: 0,
      productsCount: 0,
      averageTicket: 0,
    };
  }

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get today's sales
  const [todaySales] = await db
    .select({
      totalRevenue: sql<number>`coalesce(sum(${sales.amountCents}), 0)`,
      salesCount: sql<number>`count(*)`,
    })
    .from(sales)
    .where(
      and(
        eq(sales.organizationId, organizationId),
        eq(sales.status, "approved"),
        gte(sales.soldAt, today)
      )
    );

  // Get Cakto products count
  const caktoProducts = await listCaktoProducts(organizationId);

  // Calculate average ticket with null check
  const totalRevenue = todaySales?.totalRevenue ?? 0;
  const salesCount = todaySales?.salesCount ?? 0;
  const averageTicket = salesCount > 0
    ? Math.round(totalRevenue / salesCount)
    : 0;

  return {
    revenueToday: totalRevenue,
    salesToday: salesCount,
    productsCount: caktoProducts.length,
    averageTicket,
  };
}

export async function getRevenueData(
  organizationId: string,
  days: number = 7
): Promise<RevenueData[]> {
  const hasIntegration = await hasCaktoIntegration(organizationId);

  if (!hasIntegration) {
    return [];
  }

  // Get start date
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  // Get sales data grouped by date
  const salesData = await db
    .select({
      date: sql<string>`date(${sales.soldAt})`,
      totalRevenue: sql<number>`coalesce(sum(${sales.amountCents}), 0)`,
      salesCount: sql<number>`count(*)`,
    })
    .from(sales)
    .where(
      and(
        eq(sales.organizationId, organizationId),
        eq(sales.status, "approved"),
        gte(sales.soldAt, startDate)
      )
    )
    .groupBy(sql`date(${sales.soldAt})`)
    .orderBy(sql`date(${sales.soldAt})`);

  // Fill in missing dates with zero values
  const result: RevenueData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date()) {
    const dateStr = currentDate.toISOString().split('T')[0] as string;
    const dayData = salesData.find(d => d.date === dateStr);

    result.push({
      date: dateStr,
      revenue: dayData?.totalRevenue ?? 0,
      sales: dayData?.salesCount ?? 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

export async function getFeaturedProducts(organizationId: string): Promise<FeaturedProduct[]> {
  const hasIntegration = await hasCaktoIntegration(organizationId);

  if (!hasIntegration) {
    return [];
  }

  // Get products with sales data
  const productsWithSales = await db
    .select({
      productId: products.id,
      productName: products.title,
      productStatus: products.status,
      totalRevenue: sql<number>`coalesce(sum(${sales.amountCents}), 0)`,
      salesCount: sql<number>`count(*)`,
    })
    .from(products)
    .leftJoin(sales, eq(products.id, sales.productId))
    .where(
      and(
        eq(products.organizationId, organizationId),
        eq(sales.status, "approved")
      )
    )
    .groupBy(products.id, products.title, products.status);

  // Calculate average ticket and add score (placeholder - would need real score calculation)
  const result: FeaturedProduct[] = await Promise.all(
    productsWithSales.map(async (p) => {
      const averageTicket = p.salesCount > 0 ? Math.round(p.totalRevenue / p.salesCount) : 0;
      const score = 50; // Placeholder - would need real score calculation

      return {
        id: p.productId,
        name: p.productName,
        score,
        status: p.productStatus,
        revenue: p.totalRevenue,
        sales: p.salesCount,
        averageTicket,
      };
    })
  );

  return result;
}
