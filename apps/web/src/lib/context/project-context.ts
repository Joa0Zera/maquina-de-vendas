import { db, products, offers, landingPages, sales } from "@maquina/database";
import { eq } from "drizzle-orm";
import { AIContext } from "@/lib/ai/types";

export async function getProjectContext(projectId: string, organizationId: string): Promise<AIContext> {
  const context: AIContext = {
    projectId,
    organizationId,
  };

  try {
    // Get product information
    const [product] = await db
      .select({
        id: products.id,
        name: products.title,
        description: products.description,
        price: products.priceCents,
      })
      .from(products)
      .where(eq(products.id, projectId))
      .limit(1);

    if (product) {
      context.product = {
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
      };
    }

    // Get offer information
    const [offer] = await db
      .select({
        id: offers.id,
        name: offers.name,
        pricing: offers.pricing,
        caktoCheckoutUrl: offers.caktoCheckoutUrl,
      })
      .from(offers)
      .where(eq(offers.productId, projectId))
      .limit(1);

    if (offer) {
      // Extract price from pricing JSON if available
      const pricing = offer.pricing as Record<string, unknown> | null;
      const price = (pricing?.priceCents as number) || 0;
      context.offer = {
        id: offer.id,
        name: offer.name,
        price,
      };
    }

    // Get landing page information
    const [landing] = await db
      .select({
        id: landingPages.id,
        publishedUrl: landingPages.publishedUrl,
        deploymentUrl: landingPages.deploymentUrl,
      })
      .from(landingPages)
      .where(eq(landingPages.productId, projectId))
      .limit(1);

    if (landing) {
      const url = landing.publishedUrl || landing.deploymentUrl;
      if (url) {
        context.landing = {
          id: landing.id,
          url,
        };
      }
    }

    // Get checkout URL from offers (caktoCheckoutUrl)
    if (offer && offer.caktoCheckoutUrl) {
      context.checkout = {
        id: offer.id,
        url: offer.caktoCheckoutUrl,
      };
    }
  } catch (error) {
    console.error("Error fetching project context:", error);
  }

  return context;
}

export async function enrichContextWithResearch(
  context: AIContext,
  researchData: Record<string, unknown>
): Promise<AIContext> {
  if (researchData && context.projectId) {
    context.research = {
      id: context.projectId,
      topic: (researchData.topic as string) || "",
      data: researchData,
    };
  }

  return context;
}
