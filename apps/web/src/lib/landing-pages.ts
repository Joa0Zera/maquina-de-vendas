import { db, landingPages, offers, products } from "@maquina/database";
import { desc, eq } from "drizzle-orm";

export async function listLandingPagesByOrganization(organizationId: string) {
  return db
    .select({
      id: landingPages.id,
      title: landingPages.title,
      slug: landingPages.slug,
      status: landingPages.status,
      createdAt: landingPages.createdAt,
      offerId: landingPages.offerId,
      offerName: offers.name,
      productName: products.title,
    })
    .from(landingPages)
    .leftJoin(offers, eq(landingPages.offerId, offers.id))
    .leftJoin(products, eq(landingPages.productId, products.id))
    .where(eq(landingPages.organizationId, organizationId))
    .orderBy(desc(landingPages.createdAt));
}

export async function getLandingPageById(id: string, organizationId: string) {
  const [row] = await db
    .select({
      id: landingPages.id,
      title: landingPages.title,
      slug: landingPages.slug,
      status: landingPages.status,
      sections: landingPages.sections,
      createdAt: landingPages.createdAt,
      updatedAt: landingPages.updatedAt,
      offerId: landingPages.offerId,
      offerName: offers.name,
      productName: products.title,
      v0Prompt: landingPages.v0Prompt,
      v0Status: landingPages.v0Status,
      v0ProjectUrl: landingPages.v0ProjectUrl,
      v0GeneratedAt: landingPages.v0GeneratedAt,
      deploymentUrl: landingPages.deploymentUrl,
      deploymentStatus: landingPages.deploymentStatus,
      deployedAt: landingPages.deployedAt,
    })
    .from(landingPages)
    .leftJoin(offers, eq(landingPages.offerId, offers.id))
    .leftJoin(products, eq(landingPages.productId, products.id))
    .where(eq(landingPages.id, id))
    .limit(1);
  return row ?? null;
}
