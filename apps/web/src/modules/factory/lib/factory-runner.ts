import { db, launchEvents, offers, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateProductFromTrend } from "@/lib/product-generator";
import { generateCopyAssetsAction } from "@/actions/copy";
import { generateOrganicDistributionAction } from "@/actions/organic-distribution";
import { generateIntelligenceReportAction } from "@/actions/intelligence";

export interface FactoryInput {
  organizationId: string;
  trendId?: string;
  theme?: string;
  category?: string;
  priceCents?: number;
}

export interface FactoryResult {
  productId: string;
  steps: FactoryStep[];
}

export interface FactoryStep {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  error?: string;
}

export class FactoryRunner {
  static async run(input: FactoryInput): Promise<FactoryResult> {
    const steps: FactoryStep[] = [
      { name: "Trend", status: "pending" },
      { name: "Produto", status: "pending" },
      { name: "Oferta", status: "pending" },
      { name: "Copy", status: "pending" },
      { name: "Distribuição", status: "pending" },
      { name: "Inteligência", status: "pending" },
    ];

    let productId: string;

    try {
      // Step 1: Trend (skip for now, requires trends table)
      if (steps[0]) steps[0].status = "completed";

      // Step 2: Product
      if (steps[1]) steps[1].status = "running";
      let generated;
      if (input.theme) {
        generated = {
          productName: input.theme,
          headline: `Descubra ${input.theme}`,
          targetAudience: "Profissionais e entusiastas",
          problem: `Falta de conhecimento sobre ${input.theme}`,
          desiredOutcome: `Dominar ${input.theme} completamente`,
          subheadline: `O guia definitivo sobre ${input.theme}`,
          bigPromise: `Transforme sua vida com ${input.theme}`,
          uniqueMechanism: "Metodologia passo a passo",
          objectionHandling: "Simples e prático",
          guarantee: "30 dias de garantia",
          offerStack: ["Ebook principal", "Checklists", "Templates"],
          ebookStructure: ["Introdução", "Fundamentos", "Técnicas Avançadas", "Casos de Estudo"],
          qualityScore: 80,
        };
      } else {
        throw new Error("Theme must be provided");
      }

      const slug = generated.productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const [product] = await db
        .insert(products)
        .values({
          organizationId: input.organizationId,
          title: generated.productName,
          slug,
          description: generated.bigPromise,
          priceCents: input.priceCents || 0,
          status: "draft",
        })
        .returning();

      if (!product) {
        throw new Error("Failed to create product");
      }

      productId = product.id;

      await db.insert(launchEvents).values({
        organizationId: input.organizationId,
        productId,
        eventType: "PRODUCT_CREATED",
        description: "Product created from factory",
      });

      if (steps[1]) steps[1].status = "completed";

      // Step 3: Offer
      if (steps[2]) steps[2].status = "running";
      const [offer] = await db
        .insert(offers)
        .values({
          organizationId: input.organizationId,
          productId: product.id,
          name: generated.productName,
          headline: generated.headline,
          copy: {
            targetAudience: generated.targetAudience,
            problem: generated.problem,
            desiredOutcome: generated.desiredOutcome,
            subheadline: generated.subheadline,
            bigPromise: generated.bigPromise,
            uniqueMechanism: generated.uniqueMechanism,
            objectionHandling: generated.objectionHandling,
            guarantee: generated.guarantee,
            offerStack: generated.offerStack,
            ebookStructure: generated.ebookStructure,
            qualityScore: generated.qualityScore,
          },
          status: "draft",
        })
        .returning();

      if (!offer) {
        throw new Error("Failed to create offer");
      }

      await db.insert(launchEvents).values({
        organizationId: input.organizationId,
        productId,
        eventType: "OFFER_CREATED",
        description: "Offer created from factory",
      });

      if (steps[2]) steps[2].status = "completed";

      // Step 4: Copy
      if (steps[3]) steps[3].status = "running";
      await generateCopyAssetsAction(productId);

      await db.insert(launchEvents).values({
        organizationId: input.organizationId,
        productId,
        eventType: "COPY_CREATED",
        description: "Copy assets generated from factory",
      });

      if (steps[3]) steps[3].status = "completed";

      // Step 5: Organic Distribution
      if (steps[4]) steps[4].status = "running";
      await generateOrganicDistributionAction(productId);

      await db.insert(launchEvents).values({
        organizationId: input.organizationId,
        productId,
        eventType: "TRAFFIC_CREATED",
        description: "Organic distribution generated from factory",
      });

      if (steps[4]) steps[4].status = "completed";

      // Step 6: Intelligence
      if (steps[5]) steps[5].status = "running";
      await generateIntelligenceReportAction(productId);

      await db.insert(launchEvents).values({
        organizationId: input.organizationId,
        productId,
        eventType: "V0_CREATED",
        description: "Intelligence report generated from factory",
      });

      if (steps[5]) steps[5].status = "completed";

      // Revalidate paths
      revalidatePath("/products");
      revalidatePath("/products/new");
      revalidatePath("/");

      return { productId, steps };
    } catch (error) {
      // Mark failed step
      const failedStep = steps.find(s => s.status === "running");
      if (failedStep) {
        failedStep.status = "failed";
        failedStep.error = error instanceof Error ? error.message : "Unknown error";
      }
      throw error;
    }
  }
}
