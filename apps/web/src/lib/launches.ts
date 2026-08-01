import { db, copyAssets, ebooks, intelligenceReports, landingPages, launchEvents, launchMetrics, offers, organicDistribution, products, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";

export type LaunchStatus = "READY" | "MISSING";
export type OverallLaunchStatus = "READY_TO_SELL" | "IN_PROGRESS";
export type CommercialStatus = "DRAFT" | "BUILDING" | "READY" | "SELLING" | "PAUSED";

export interface LaunchItem {
  offerId: string;
  productId: string;
  productName: string;
  offerName: string;
  ebookStatus: LaunchStatus;
  landingStatus: LaunchStatus;
  v0Status: LaunchStatus;
  deployStatus: LaunchStatus;
  checkoutStatus: LaunchStatus;
  trafficResearchStatus: LaunchStatus;
  copyStatus: LaunchStatus;
  organicDistributionStatus: LaunchStatus;
  intelligenceStatus: LaunchStatus;
  overallStatus: OverallLaunchStatus;
  launchScore: number;
  commercialStatus: CommercialStatus;
  nextAction: string;
  landingPageId: string | null;
  deploymentUrl: string | null;
  caktoCheckoutUrl: string | null;
}

export async function listLaunchesByOrganization(organizationId: string): Promise<LaunchItem[]> {
  // Fetch all offers for the organization
  const offersList = await db
    .select({
      offerId: offers.id,
      offerName: offers.name,
      productId: offers.productId,
      caktoCheckoutUrl: offers.caktoCheckoutUrl,
      caktoStatus: offers.caktoStatus,
      caktoOfferId: offers.caktoOfferId,
    })
    .from(offers)
    .where(eq(offers.organizationId, organizationId));

  const launchItems: LaunchItem[] = [];

  for (const offer of offersList) {
    const launchStatus = await getLaunchStatus(offer.offerId, organizationId);
    launchItems.push(launchStatus);
  }

  return launchItems;
}

export async function getLaunchStatus(offerId: string, organizationId: string): Promise<LaunchItem> {
  // Fetch offer with product info
  const [offer] = await db
    .select({
      offerId: offers.id,
      offerName: offers.name,
      productId: offers.productId,
      caktoCheckoutUrl: offers.caktoCheckoutUrl,
      caktoStatus: offers.caktoStatus,
      caktoOfferId: offers.caktoOfferId,
      productTitle: products.title,
    })
    .from(offers)
    .innerJoin(products, eq(offers.productId, products.id))
    .where(and(eq(offers.id, offerId), eq(offers.organizationId, organizationId)))
    .limit(1);

  if (!offer) {
    throw new Error("Offer not found");
  }

  // Check ebook status
  const [ebook] = await db
    .select({ id: ebooks.id })
    .from(ebooks)
    .where(and(eq(ebooks.offerId, offerId), eq(ebooks.organizationId, organizationId)))
    .limit(1);

  const ebookStatus: LaunchStatus = ebook ? "READY" : "MISSING";

  // Check landing page status
  const [landingPage] = await db
    .select({
      id: landingPages.id,
      v0Prompt: landingPages.v0Prompt,
      deploymentStatus: landingPages.deploymentStatus,
      deploymentUrl: landingPages.deploymentUrl,
    })
    .from(landingPages)
    .where(and(eq(landingPages.offerId, offerId), eq(landingPages.organizationId, organizationId)))
    .limit(1);

  const landingStatus: LaunchStatus = landingPage ? "READY" : "MISSING";
  const v0Status: LaunchStatus = landingPage?.v0Prompt ? "READY" : "MISSING";
  const deployStatus: LaunchStatus = landingPage?.deploymentStatus === "deployed" ? "READY" : "MISSING";

  // Check checkout status
  const checkoutStatus: LaunchStatus = offer.caktoOfferId ? "READY" : "MISSING";

  // Check traffic research status
  const [traffic] = await db
    .select()
    .from(trafficResearch)
    .where(
      and(
        eq(trafficResearch.productId, offer.productId),
        eq(trafficResearch.organizationId, organizationId)
      )
    )
    .limit(1);

  const trafficResearchStatus: LaunchStatus = traffic ? "READY" : "MISSING";

  // Check copy status
  const [copy] = await db
    .select()
    .from(copyAssets)
    .where(
      and(
        eq(copyAssets.productId, offer.productId),
        eq(copyAssets.organizationId, organizationId)
      )
    )
    .limit(1);

  const copyStatus: LaunchStatus = copy ? "READY" : "MISSING";

  // Check organic distribution status
  const [organic] = await db
    .select()
    .from(organicDistribution)
    .where(
      and(
        eq(organicDistribution.productId, offer.productId),
        eq(organicDistribution.organizationId, organizationId)
      )
    )
    .limit(1);

  const organicDistributionStatus: LaunchStatus = organic ? "READY" : "MISSING";

  // Check intelligence status
  const [intelligence] = await db
    .select()
    .from(intelligenceReports)
    .where(
      and(
        eq(intelligenceReports.productId, offer.productId),
        eq(intelligenceReports.organizationId, organizationId)
      )
    )
    .limit(1);

  const intelligenceStatus: LaunchStatus = intelligence ? "READY" : "MISSING";

  // Calculate launch score
  let launchScore = 0;
  launchScore += 10; // Product exists (offer exists)
  if (trafficResearchStatus === "READY") launchScore += 10;
  if (copyStatus === "READY") launchScore += 10;
  if (organicDistributionStatus === "READY") launchScore += 10;
  if (ebookStatus === "READY") launchScore += 10;
  if (landingStatus === "READY") launchScore += 10;
  if (v0Status === "READY") launchScore += 10;
  if (deployStatus === "READY") launchScore += 10;
  if (checkoutStatus === "READY") launchScore += 20;

  // Determine commercial status
  let commercialStatus: CommercialStatus = "DRAFT";
  if (launchScore === 100) {
    commercialStatus = "READY";
  } else if (launchScore > 10) {
    commercialStatus = "BUILDING";
  }

  // Determine next action
  const nextAction = getNextAction(
    trafficResearchStatus,
    copyStatus,
    organicDistributionStatus,
    ebookStatus,
    landingStatus,
    v0Status,
    deployStatus,
    checkoutStatus
  );

  // Compute overall status
  const allReady = [
    ebookStatus,
    landingStatus,
    v0Status,
    deployStatus,
    checkoutStatus,
    trafficResearchStatus,
    copyStatus,
    organicDistributionStatus,
  ].every((status) => status === "READY");

  const overallStatus: OverallLaunchStatus = allReady ? "READY_TO_SELL" : "IN_PROGRESS";

  return {
    offerId: offer.offerId,
    productId: offer.productId,
    productName: offer.productTitle,
    offerName: offer.offerName,
    ebookStatus,
    landingStatus,
    v0Status,
    deployStatus,
    checkoutStatus,
    trafficResearchStatus,
    copyStatus,
    organicDistributionStatus,
    intelligenceStatus,
    overallStatus,
    launchScore,
    commercialStatus,
    nextAction,
    landingPageId: landingPage?.id || null,
    deploymentUrl: landingPage?.deploymentUrl || null,
    caktoCheckoutUrl: offer.caktoCheckoutUrl || null,
  };
}

function getNextAction(
  trafficResearchStatus: LaunchStatus,
  copyStatus: LaunchStatus,
  organicDistributionStatus: LaunchStatus,
  ebookStatus: LaunchStatus,
  landingStatus: LaunchStatus,
  v0Status: LaunchStatus,
  deployStatus: LaunchStatus,
  checkoutStatus: LaunchStatus
): string {
  if (trafficResearchStatus === "MISSING") return "Gerar Pesquisa";
  if (copyStatus === "MISSING") return "Gerar Copy";
  if (organicDistributionStatus === "MISSING") return "Gerar Distribuição Orgânica";
  if (ebookStatus === "MISSING") return "Gerar Ebook";
  if (landingStatus === "MISSING") return "Gerar Landing";
  if (v0Status === "MISSING") return "Gerar V0";
  if (deployStatus === "MISSING") return "Registrar Deploy";
  if (checkoutStatus === "MISSING") return "Publicar na Cakto";
  return "Abrir Checkout";
}

export async function getExecutiveDashboardMetrics(organizationId: string) {
  const launches = await listLaunchesByOrganization(organizationId);

  const totalProducts = launches.length;
  const readyProducts = launches.filter((l) => l.commercialStatus === "READY").length;
  const sellingProducts = launches.filter((l) => l.commercialStatus === "SELLING").length;

  // Aggregate metrics from launch_metrics
  const metrics = await db
    .select({
      totalVisits: launchMetrics.visits,
      totalCheckouts: launchMetrics.checkouts,
      totalSales: launchMetrics.sales,
      totalRevenue: launchMetrics.revenue,
    })
    .from(launchMetrics)
    .where(eq(launchMetrics.organizationId, organizationId));

  const totalVisits = metrics.reduce((sum, m) => sum + (m.totalVisits || 0), 0);
  const totalCheckouts = metrics.reduce((sum, m) => sum + (m.totalCheckouts || 0), 0);
  const totalSales = metrics.reduce((sum, m) => sum + (m.totalSales || 0), 0);
  const totalRevenue = metrics.reduce((sum, m) => sum + (m.totalRevenue || 0), 0);

  // Intelligence metrics
  const averageLaunchScore = launches.length > 0
    ? Math.round(launches.reduce((sum, l) => sum + l.launchScore, 0) / launches.length)
    : 0;
  const productsReadyToScale = launches.filter((l) => l.launchScore >= 80).length;
  const productsWithBottlenecks = launches.filter((l) => l.launchScore < 50).length;
  const productsMissingDeploy = launches.filter((l) => l.deployStatus === "MISSING").length;
  const productsMissingCheckout = launches.filter((l) => l.checkoutStatus === "MISSING").length;

  // Organic Reach metrics
  const organicDistributions = await db
    .select()
    .from(organicDistribution)
    .where(eq(organicDistribution.organizationId, organizationId));

  const totalFacebookGroups = organicDistributions.reduce((sum, d) => sum + (d.facebookGroups as any[]).length, 0);
  const totalWhatsAppGroups = organicDistributions.reduce((sum, d) => sum + (d.whatsappGroups as any[]).length, 0);
  const totalTelegramGroups = organicDistributions.reduce((sum, d) => sum + (d.telegramGroups as any[]).length, 0);
  const totalDiscordCommunities = organicDistributions.reduce((sum, d) => sum + (d.discordCommunities as any[]).length, 0);
  const totalHashtags = organicDistributions.reduce((sum, d) => sum + (d.hashtags as string[]).length, 0);

  return {
    totalProducts,
    readyProducts,
    sellingProducts,
    totalVisits,
    totalCheckouts,
    totalSales,
    totalRevenue,
    averageLaunchScore,
    productsReadyToScale,
    productsWithBottlenecks,
    productsMissingDeploy,
    productsMissingCheckout,
    totalFacebookGroups,
    totalWhatsAppGroups,
    totalTelegramGroups,
    totalDiscordCommunities,
    totalHashtags,
  };
}
