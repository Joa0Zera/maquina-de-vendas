"use server";

import { db, landingPages } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateV0Prompt } from "@/lib/v0-generator";
import { requireOrganization } from "@/lib/session";

export async function generateV0PromptAction(landingPageId: string) {
  const { organizationId } = await requireOrganization();

  // Fetch the landing page
  const [landingPage] = await db
    .select()
    .from(landingPages)
    .where(and(eq(landingPages.id, landingPageId), eq(landingPages.organizationId, organizationId)))
    .limit(1);

  if (!landingPage) {
    throw new Error("Landing page not found");
  }

  // Generate V0 prompt
  const sections = landingPage.sections as {
    hero: { headline: string; subheadline: string; cta: string };
    problem: { painPoints: string[] };
    solution: { explanation: string };
    benefits: { benefits: string[] };
    offer: { presentation: string; uniqueMechanism: string; offerStack: string[]; guarantee: string };
    objectionHandling: { objections: string[] };
    faq: { questions: Array<{ question: string; answer: string }> };
    cta: { finalCallToAction: string };
  } || {};

  const v0Prompt = generateV0Prompt(landingPage.title, sections);

  // Update landing page with V0 prompt
  const [updated] = await db
    .update(landingPages)
    .set({
      v0Prompt,
      v0Status: "generated",
      v0GeneratedAt: new Date(),
    })
    .where(and(eq(landingPages.id, landingPageId), eq(landingPages.organizationId, organizationId)))
    .returning();

  if (!updated) {
    throw new Error("Failed to update landing page");
  }

  // Revalidate paths
  revalidatePath(`/landing-pages/${landingPageId}`);
  revalidatePath(`/landing-pages/${landingPageId}/v0`);

  redirect(`/landing-pages/${landingPageId}/v0`);
}

export async function registerDeploymentAction(landingPageId: string, formData: FormData) {
  const { organizationId } = await requireOrganization();

  const deploymentUrl = formData.get("deploymentUrl") as string;

  if (!deploymentUrl) {
    throw new Error("Deployment URL is required");
  }

  // Validate organization ownership
  const [landingPage] = await db
    .select()
    .from(landingPages)
    .where(and(eq(landingPages.id, landingPageId), eq(landingPages.organizationId, organizationId)))
    .limit(1);

  if (!landingPage) {
    throw new Error("Landing page not found");
  }

  // Update landing page with deployment info
  const [updated] = await db
    .update(landingPages)
    .set({
      deploymentUrl,
      deploymentStatus: "deployed",
      deployedAt: new Date(),
    })
    .where(and(eq(landingPages.id, landingPageId), eq(landingPages.organizationId, organizationId)))
    .returning();

  if (!updated) {
    throw new Error("Failed to update landing page");
  }

  // Revalidate paths
  revalidatePath(`/landing-pages/${landingPageId}`);
  revalidatePath(`/landing-pages/${landingPageId}/deploy`);

  redirect(`/landing-pages/${landingPageId}`);
}

export async function getLandingPageById(landingPageId: string, organizationId: string) {
  const [landingPage] = await db
    .select()
    .from(landingPages)
    .where(and(eq(landingPages.id, landingPageId), eq(landingPages.organizationId, organizationId)))
    .limit(1);

  return landingPage;
}
