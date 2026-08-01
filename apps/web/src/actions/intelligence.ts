"use server";

import { db, copyAssets, intelligenceReports, landingPages, offers, organicDistribution, products, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/session";

export async function generateIntelligenceReportAction(productId: string) {
  const { organizationId } = await requireOrganization();

  // Fetch product
  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
    })
    .from(products)
    .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    throw new Error("Product not found");
  }

  // Fetch traffic research
  const [traffic] = await db
    .select()
    .from(trafficResearch)
    .where(
      and(
        eq(trafficResearch.productId, productId),
        eq(trafficResearch.organizationId, organizationId)
      )
    )
    .limit(1);

  // Fetch copy assets
  const [copy] = await db
    .select()
    .from(copyAssets)
    .where(
      and(
        eq(copyAssets.productId, productId),
        eq(copyAssets.organizationId, organizationId)
      )
    )
    .limit(1);

  // Fetch organic distribution
  const [organic] = await db
    .select()
    .from(organicDistribution)
    .where(
      and(
        eq(organicDistribution.productId, productId),
        eq(organicDistribution.organizationId, organizationId)
      )
    )
    .limit(1);

  // Fetch offer
  const [offer] = await db
    .select({
      id: offers.id,
      pricing: offers.pricing,
      caktoOfferId: offers.caktoOfferId,
    })
    .from(offers)
    .where(and(eq(offers.productId, productId), eq(offers.organizationId, organizationId)))
    .limit(1);

  // Fetch landing page
  const [landing] = await db
    .select({
      id: landingPages.id,
      deploymentStatus: landingPages.deploymentStatus,
    })
    .from(landingPages)
    .where(and(eq(landingPages.offerId, offer?.id || ""), eq(landingPages.organizationId, organizationId)))
    .limit(1);

  // Generate intelligence report
  const report = generateIntelligenceReport(
    product,
    traffic,
    copy,
    organic,
    offer,
    landing
  );

  // Check if report already exists
  const [existing] = await db
    .select()
    .from(intelligenceReports)
    .where(
      and(
        eq(intelligenceReports.productId, productId),
        eq(intelligenceReports.organizationId, organizationId)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(intelligenceReports)
      .set(report)
      .where(eq(intelligenceReports.id, existing.id));
  } else {
    await db.insert(intelligenceReports).values({
      organizationId,
      productId,
      ...report,
    });
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/intelligence`);
  revalidatePath(`/launches`);

  redirect(`/products/${productId}/intelligence`);
}

function generateIntelligenceReport(
  product: any,
  traffic: any,
  copy: any,
  organic: any,
  offer: any,
  landing: any
) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const bottlenecks: string[] = [];
  const opportunities: string[] = [];
  const recommendations: string[] = [];

  let score = 0;

  // Product criteria
  if (product.title) score += 5;
  if (product.description) score += 5;

  if (product.title && product.description) {
    strengths.push("Produto possui informações completas");
  } else {
    weaknesses.push("Produto com informações incompletas");
  }

  // Offer criteria
  if (offer?.pricing) score += 10;
  if (offer?.caktoOfferId) score += 15;

  if (offer?.pricing && offer?.caktoOfferId) {
    strengths.push("Checkout ativo e configurado");
  } else if (!offer?.pricing) {
    bottlenecks.push("Preço não definido");
    recommendations.push("Definir preço da oferta");
  } else if (!offer?.caktoOfferId) {
    bottlenecks.push("Checkout não sincronizado");
    recommendations.push("Sincronizar checkout com Cakto");
  }

  // Traffic criteria
  if (traffic) score += 10;

  if (traffic) {
    strengths.push("Pesquisa de tráfego realizada");
  } else {
    bottlenecks.push("Sem pesquisa de tráfego");
    recommendations.push("Gerar pesquisa de tráfego");
  }

  // Copy criteria
  if (copy?.headlines?.length > 0) score += 5;
  if (copy?.adCopies?.length > 0) score += 5;
  if (copy?.emailSequence?.length > 0) score += 5;

  if (copy?.headlines?.length > 0 && copy?.adCopies?.length > 0 && copy?.emailSequence?.length > 0) {
    strengths.push("Copy completa com headlines, anúncios e emails");
  } else {
    weaknesses.push("Copy incompleta");
    if (!copy?.headlines?.length) recommendations.push("Gerar headlines");
    if (!copy?.adCopies?.length) recommendations.push("Gerar anúncios");
    if (!copy?.emailSequence?.length) recommendations.push("Gerar sequência de emails");
  }

  // Organic Distribution criteria
  if (organic) score += 10;

  if (organic) {
    const facebookGroups = (organic.facebookGroups as any[]) || [];
    const whatsappGroups = (organic.whatsappGroups as any[]) || [];
    const telegramGroups = (organic.telegramGroups as any[]) || [];
    const discordCommunities = (organic.discordCommunities as any[]) || [];
    const hashtags = (organic.hashtags as string[]) || [];

    strengths.push("Distribuição orgânica gerada");
    if (facebookGroups.length > 0) strengths.push(`${facebookGroups.length} grupos Facebook identificados`);
    if (whatsappGroups.length > 0) strengths.push(`${whatsappGroups.length} grupos WhatsApp identificados`);
    if (telegramGroups.length > 0) strengths.push(`${telegramGroups.length} canais Telegram identificados`);
    if (discordCommunities.length > 0) strengths.push(`${discordCommunities.length} comunidades Discord identificadas`);
    if (hashtags.length > 0) strengths.push(`${hashtags.length} hashtags geradas`);
  } else {
    bottlenecks.push("Sem distribuição orgânica");
    recommendations.push("Gerar distribuição orgânica");
  }

  // Landing criteria
  if (landing) score += 10;

  if (landing) {
    strengths.push("Landing page criada");
  } else {
    bottlenecks.push("Sem landing page");
    recommendations.push("Gerar landing page");
  }

  // Deploy criteria
  if (landing?.deploymentStatus === "deployed") score += 10;

  if (landing?.deploymentStatus === "deployed") {
    strengths.push("Landing publicada");
  } else {
    bottlenecks.push("Landing não publicada");
    recommendations.push("Registrar deploy da landing page");
  }

  // Opportunities
  if (offer?.caktoOfferId && landing?.deploymentStatus === "deployed") {
    opportunities.push("Adicionar order bump para aumentar ticket médio");
    opportunities.push("Criar segunda oferta para upsell");
    opportunities.push("Implementar retargeting para visitantes");
  }

  if (copy?.headlines?.length > 20) {
    opportunities.push("Testar diferentes variações de headlines");
  }

  if (organic) {
    const facebookGroups = (organic.facebookGroups as any[]) || [];
    const whatsappGroups = (organic.whatsappGroups as any[]) || [];
    const telegramGroups = (organic.telegramGroups as any[]) || [];
    const discordCommunities = (organic.discordCommunities as any[]) || [];
    const hashtags = (organic.hashtags as string[]) || [];

    if (facebookGroups.length > 10) opportunities.push("Expandir para mais grupos Facebook");
    if (whatsappGroups.length > 10) opportunities.push("Expandir para mais grupos WhatsApp");
    if (telegramGroups.length > 5) opportunities.push("Expandir para mais canais Telegram");
    if (discordCommunities.length > 5) opportunities.push("Expandir para mais comunidades Discord");
    if (hashtags.length > 30) opportunities.push("Testar diferentes combinações de hashtags");
  }

  // Sort recommendations by priority
  recommendations.sort((a, b) => {
    const priorityOrder = [
      "Definir preço da oferta",
      "Sincronizar checkout com Cakto",
      "Gerar pesquisa de tráfego",
      "Gerar distribuição orgânica",
      "Gerar landing page",
      "Registrar deploy da landing page",
      "Gerar headlines",
      "Gerar anúncios",
      "Gerar sequência de emails",
    ];
    return priorityOrder.indexOf(a) - priorityOrder.indexOf(b);
  });

  return {
    score,
    strengths,
    weaknesses,
    bottlenecks,
    opportunities,
    recommendations,
  };
}
