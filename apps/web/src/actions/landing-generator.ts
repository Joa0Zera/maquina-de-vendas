"use server";

import { db, landingPages, offers, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateLandingPageFromOffer } from "@/lib/landing-generator";
import { requireOrganization } from "@/lib/session";

export async function generateLandingPageFromOfferAction(offerId: string) {
  const { organizationId } = await requireOrganization();

  // Fetch the offer with product
  const [offer] = await db
    .select({
      id: offers.id,
      name: offers.name,
      headline: offers.headline,
      copy: offers.copy,
      productId: offers.productId,
      productTitle: products.title,
    })
    .from(offers)
    .innerJoin(products, eq(offers.productId, products.id))
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .limit(1);

  if (!offer) {
    throw new Error("Offer not found");
  }

  // Generate landing page sections
  const sections = generateLandingPageFromOffer(offer as any);

  // Create a slug from the offer name
  const slug = offer.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Create the landing page
  const [landingPage] = await db
    .insert(landingPages)
    .values({
      organizationId,
      offerId: offer.id,
      productId: offer.productId,
      title: offer.name,
      slug,
      status: "draft",
      sections,
    })
    .returning();

  if (!landingPage) {
    throw new Error("Failed to create landing page");
  }

  // Revalidate paths
  revalidatePath("/landing-pages");
  revalidatePath("/");

  redirect(`/landing-pages/${landingPage.id}`);
}
