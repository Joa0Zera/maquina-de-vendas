import { db, offers, products } from "@maquina/database";
import { desc, eq } from "drizzle-orm";

export async function listOffersByOrganization(organizationId: string) {
  return db
    .select({
      id: offers.id,
      name: offers.name,
      headline: offers.headline,
      status: offers.status,
      createdAt: offers.createdAt,
      productId: offers.productId,
      productTitle: products.title,
    })
    .from(offers)
    .innerJoin(products, eq(offers.productId, products.id))
    .where(eq(offers.organizationId, organizationId))
    .orderBy(desc(offers.createdAt));
}

export async function getOfferById(id: string, organizationId: string) {
  const [row] = await db
    .select({
      id: offers.id,
      name: offers.name,
      headline: offers.headline,
      copy: offers.copy,
      pricing: offers.pricing,
      status: offers.status,
      createdAt: offers.createdAt,
      updatedAt: offers.updatedAt,
      productId: offers.productId,
      productTitle: products.title,
      productSlug: products.slug,
      caktoProductId: offers.caktoProductId,
      caktoCheckoutUrl: offers.caktoCheckoutUrl,
      caktoStatus: offers.caktoStatus,
      caktoCreatedAt: offers.caktoCreatedAt,
      caktoOfferId: offers.caktoOfferId,
      caktoOfferStatus: offers.caktoOfferStatus,
      caktoSyncedAt: offers.caktoSyncedAt,
    })
    .from(offers)
    .innerJoin(products, eq(offers.productId, products.id))
    .where(eq(offers.id, id))
    .limit(1);
  return row ?? null;
}
