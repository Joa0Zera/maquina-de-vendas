"use server";

import { db, offers, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/session";
import { createCaktoOffer, createCaktoProduct } from "@/lib/cakto";

export async function registerCheckoutAction(offerId: string, formData: FormData) {
  const { organizationId } = await requireOrganization();

  const caktoProductId = formData.get("caktoProductId") as string;
  const caktoCheckoutUrl = formData.get("caktoCheckoutUrl") as string;

  if (!caktoProductId || !caktoCheckoutUrl) {
    throw new Error("Cakto Product ID and Checkout URL are required");
  }

  // Validate organization ownership
  const [offer] = await db
    .select()
    .from(offers)
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .limit(1);

  if (!offer) {
    throw new Error("Offer not found");
  }

  // Update offer with Cakto checkout info
  const [updated] = await db
    .update(offers)
    .set({
      caktoProductId,
      caktoCheckoutUrl,
      caktoStatus: "active",
      caktoCreatedAt: new Date(),
    })
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .returning();

  if (!updated) {
    throw new Error("Failed to update offer");
  }

  // Revalidate paths
  revalidatePath(`/offers/${offerId}`);
  revalidatePath(`/offers/${offerId}/checkout`);

  redirect(`/offers/${offerId}`);
}

export async function syncProductWithCaktoAction(productId: string) {
  const { organizationId } = await requireOrganization();

  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      priceCents: products.priceCents,
      caktoProductId: products.caktoProductId,
    })
    .from(products)
    .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    throw new Error("Product not found");
  }

  const [offer] = await db
    .select({ id: offers.id, name: offers.name })
    .from(offers)
    .where(and(eq(offers.productId, productId), eq(offers.organizationId, organizationId)))
    .limit(1);

  if (!offer) {
    throw new Error("Crie uma oferta antes de sincronizar com a Cakto");
  }

  const price = product.priceCents / 100;
  let caktoProductId = product.caktoProductId;

  // Cria o produto na Cakto só na primeira sincronização
  if (!caktoProductId) {
    const caktoProduct = await createCaktoProduct(organizationId, {
      name: product.title,
      description: product.description || product.title,
      price,
    });
    caktoProductId = caktoProduct.id;

    await db
      .update(products)
      .set({ caktoProductId, caktoSyncedAt: new Date() })
      .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)));
  }

  // Cria a oferta (checkout) vinculada ao produto na Cakto
  const caktoOffer = await createCaktoOffer(organizationId, {
    name: offer.name,
    price,
    caktoProductId,
  });

  await db
    .update(offers)
    .set({
      caktoProductId,
      caktoOfferId: caktoOffer.id,
      caktoOfferStatus: caktoOffer.status,
      caktoCheckoutUrl: caktoOffer.checkoutUrl || null,
      caktoStatus: "active",
      caktoSyncedAt: new Date(),
    })
    .where(and(eq(offers.id, offer.id), eq(offers.organizationId, organizationId)));

  // A landing page pública lê products.checkoutUrl, não offers.caktoCheckoutUrl.
  if (caktoOffer.checkoutUrl) {
    await db
      .update(products)
      .set({ checkoutUrl: caktoOffer.checkoutUrl })
      .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)));
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/checkout`);
  revalidatePath(`/launches`);

  redirect(`/products/${productId}/checkout`);
}

export async function publishToCaktoAction(offerId: string) {
  const { organizationId } = await requireOrganization();

  // Fetch offer with product info
  const [offer] = await db
    .select({
      id: offers.id,
      name: offers.name,
      pricing: offers.pricing,
      productId: offers.productId,
      productCaktoId: products.caktoProductId,
    })
    .from(offers)
    .innerJoin(products, eq(offers.productId, products.id))
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .limit(1);

  if (!offer) {
    throw new Error("Offer not found");
  }

  if (!offer.productCaktoId) {
    throw new Error("Product must be synced with Cakto first");
  }

  const pricing = offer.pricing as { priceCents?: number } || {};
  const price = pricing.priceCents || 0;

  // Create offer in Cakto
  const caktoOffer = await createCaktoOffer(organizationId, {
    name: offer.name,
    price,
    caktoProductId: offer.productCaktoId,
  });

  // Update offer with Cakto offer info
  const [updated] = await db
    .update(offers)
    .set({
      caktoOfferId: caktoOffer.id,
      caktoOfferStatus: caktoOffer.status,
      caktoCheckoutUrl: caktoOffer.checkoutUrl || null,
      caktoSyncedAt: new Date(),
    })
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .returning();

  if (!updated) {
    throw new Error("Failed to update offer");
  }

  // A landing page pública lê products.checkoutUrl, não offers.caktoCheckoutUrl —
  // propaga a URL gerada automaticamente para o produto associado.
  if (caktoOffer.checkoutUrl) {
    await db
      .update(products)
      .set({ checkoutUrl: caktoOffer.checkoutUrl })
      .where(and(eq(products.id, offer.productId), eq(products.organizationId, organizationId)));
  }

  // Revalidate paths
  revalidatePath(`/offers/${offerId}`);
  revalidatePath(`/launches`);

  redirect(`/offers/${offerId}`);
}

export async function getOfferById(offerId: string, organizationId: string) {
  const [offer] = await db
    .select()
    .from(offers)
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .limit(1);

  return offer;
}
