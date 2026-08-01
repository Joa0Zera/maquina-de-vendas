"use server";

import { db, offers, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/session";
import { createCaktoOffer } from "@/lib/cakto";

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
