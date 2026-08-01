"use server";

import { db, ebooks, offers } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateEbookFromOffer } from "@/lib/ebook-generator";
import { requireOrganization } from "@/lib/session";

export async function generateEbookFromOfferAction(offerId: string) {
  const { organizationId } = await requireOrganization();

  // Fetch the offer
  const [offer] = await db
    .select()
    .from(offers)
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .limit(1);

  if (!offer) {
    throw new Error("Offer not found");
  }

  // Generate ebook structure
  const ebookStructure = generateEbookFromOffer(offer);

  // Create the ebook
  const [ebook] = await db
    .insert(ebooks)
    .values({
      organizationId,
      offerId: offer.id,
      title: ebookStructure.title,
      subtitle: ebookStructure.subtitle,
      structure: ebookStructure,
      status: "ready",
    })
    .returning();

  if (!ebook) {
    throw new Error("Failed to create ebook");
  }

  // Revalidate paths
  revalidatePath("/ebooks");
  revalidatePath("/offers");

  redirect(`/ebooks/${ebook.id}`);
}

export async function getEbookById(ebookId: string, organizationId: string) {
  const [ebook] = await db
    .select()
    .from(ebooks)
    .where(and(eq(ebooks.id, ebookId), eq(ebooks.organizationId, organizationId)))
    .limit(1);

  return ebook;
}

export async function listEbooks(organizationId: string) {
  return db
    .select()
    .from(ebooks)
    .where(eq(ebooks.organizationId, organizationId))
    .orderBy(ebooks.createdAt);
}
