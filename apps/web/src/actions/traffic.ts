"use server";

import { db, products, trends, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/session";
import { generateTrafficResearchData } from "@/lib/traffic-research-data";

export async function generateTrafficResearchAction(productId: string) {
  const { organizationId } = await requireOrganization();

  // Fetch product
  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
    })
    .from(products)
    .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    throw new Error("Product not found");
  }

  // Generate traffic research based on product data
  const researchData = generateTrafficResearchData(
    product.title,
    product.description || ""
  );

  // Check if research already exists
  const [existing] = await db
    .select()
    .from(trafficResearch)
    .where(
      and(
        eq(trafficResearch.productId, productId),
        eq(trafficResearch.organizationId, organizationId)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(trafficResearch)
      .set(researchData)
      .where(eq(trafficResearch.id, existing.id));
  } else {
    await db.insert(trafficResearch).values({
      organizationId,
      productId,
      ...researchData,
    });
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/traffic`);
  revalidatePath(`/launches`);

  redirect(`/products/${productId}/traffic`);
}
