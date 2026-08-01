"use server";

import { db, copyAssets, landingPages, offers, organicDistribution, products, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/session";

export async function generateOrganicDistributionAction(productId: string) {
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

  // Fetch offer
  const [offer] = await db
    .select()
    .from(offers)
    .where(and(eq(offers.productId, productId), eq(offers.organizationId, organizationId)))
    .limit(1);

  // Fetch landing page
  const [landing] = await db
    .select()
    .from(landingPages)
    .where(and(eq(landingPages.offerId, offer?.id || ""), eq(landingPages.organizationId, organizationId)))
    .limit(1);

  // Generate organic distribution
  const distribution = generateOrganicDistribution(
    product,
    traffic,
    copy,
    offer,
    landing
  );

  // Check if distribution already exists
  const [existing] = await db
    .select()
    .from(organicDistribution)
    .where(
      and(
        eq(organicDistribution.productId, productId),
        eq(organicDistribution.organizationId, organizationId)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(organicDistribution)
      .set(distribution)
      .where(eq(organicDistribution.id, existing.id));
  } else {
    await db.insert(organicDistribution).values({
      organizationId,
      productId,
      ...distribution,
    });
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/organic`);
  revalidatePath(`/launches`);

  redirect(`/products/${productId}/organic`);
}

function generateOrganicDistribution(
  product: any,
  traffic: any,
  copy: any,
  offer: any,
  landing: any
) {
  const keywords = [
    product?.title || "",
    product?.description || "",
    traffic?.targetAudience || "",
    traffic?.interests || "",
    copy?.headlines?.join(" ") || "",
  ].join(" ").toLowerCase();

  const facebookGroups = generateFacebookGroups(keywords);
  const whatsappGroups = generateWhatsAppGroups(keywords);
  const telegramGroups = generateTelegramGroups(keywords);
  const discordCommunities = generateDiscordCommunities(keywords);
  const hashtags = generateHashtags(keywords);
  const forums = generateForums(keywords);

  return {
    facebookGroups,
    whatsappGroups,
    telegramGroups,
    discordCommunities,
    hashtags,
    forums,
  };
}

function generateFacebookGroups(keywords: string) {
  const baseGroups = [
    { name: "ChatGPT Brasil", category: "IA", members: 150000, score: 90, reason: "Alta relevância para produtos de IA" },
    { name: "Empreendedorismo Digital", category: "Negócios", members: 200000, score: 85, reason: "Público interessado em produtos digitais" },
    { name: "Marketing Digital", category: "Marketing", members: 180000, score: 80, reason: "Profissionais de marketing" },
    { name: "Renda Extra", category: "Financeiro", members: 250000, score: 75, reason: "Público buscando renda extra" },
    { name: "IA Brasil", category: "IA", members: 120000, score: 88, reason: "Comunidade focada em IA" },
    { name: "Automação", category: "Tecnologia", members: 90000, score: 82, reason: "Interessados em automação" },
    { name: "Negócios Online", category: "Negócios", members: 220000, score: 78, reason: "Empreendedores online" },
    { name: "Produtos Digitais", category: "Produtos", members: 160000, score: 83, reason: "Público específico para produtos digitais" },
    { name: "Vendas Online", category: "Vendas", members: 190000, score: 77, reason: "Vendedores e empreendedores" },
    { name: "Copywriting Brasil", category: "Marketing", members: 85000, score: 79, reason: "Copywriters e marketers" },
    { name: "Tráfego Pago", category: "Marketing", members: 110000, score: 76, reason: "Especialistas em tráfego" },
    { name: "Infoprodutos", category: "Produtos", members: 140000, score: 81, reason: "Público de infoprodutos" },
    { name: "Dropshipping Brasil", category: "E-commerce", members: 175000, score: 74, reason: "E-commerce e dropshipping" },
    { name: "YouTube Brasil", category: "Criadores", members: 300000, score: 72, reason: "Criadores de conteúdo" },
    { name: "Instagram Marketing", category: "Social Media", members: 210000, score: 73, reason: "Marketing em redes sociais" },
    { name: "TikTok Brasil", category: "Social Media", members: 280000, score: 71, reason: "Criadores TikTok" },
    { name: "E-commerce Brasil", category: "E-commerce", members: 195000, score: 75, reason: "Profissionais de e-commerce" },
    { name: "Freelancers Brasil", category: "Trabalho", members: 165000, score: 70, reason: "Freelancers e profissionais" },
    { name: "Programação Brasil", category: "Tecnologia", members: 145000, score: 68, reason: "Desenvolvedores e programadores" },
    { name: "Design Brasil", category: "Design", members: 130000, score: 69, reason: "Designers e criativos" },
  ];

  return baseGroups.slice(0, 20);
}

function generateWhatsAppGroups(keywords: string) {
  const baseGroups = [
    { name: "Marketing Digital Brasil", members: 50000, score: 85, reason: "Grupo ativo de marketing" },
    { name: "Empreendedores Digitais", members: 45000, score: 82, reason: "Networking de empreendedores" },
    { name: "Vendas Online", members: 38000, score: 80, reason: "Foco em vendas" },
    { name: "Copywriting", members: 32000, score: 78, reason: "Copywriters" },
    { name: "Tráfego Pago", members: 35000, score: 76, reason: "Especialistas em tráfego" },
    { name: "Produtos Digitais", members: 42000, score: 81, reason: "Infoprodutos" },
    { name: "IA e Automação", members: 28000, score: 84, reason: "Tecnologia e IA" },
    { name: "E-commerce", members: 39000, score: 77, reason: "Lojistas virtuais" },
    { name: "Dropshipping", members: 36000, score: 75, reason: "Dropshippers" },
    { name: "YouTube Brasil", members: 55000, score: 72, reason: "Criadores de conteúdo" },
    { name: "Instagram Marketing", members: 41000, score: 73, reason: "Social media" },
    { name: "TikTok Brasil", members: 48000, score: 71, reason: "Criadores TikTok" },
    { name: "Freelancers", members: 33000, score: 69, reason: "Profissionais freelancers" },
    { name: "Design Gráfico", members: 29000, score: 68, reason: "Designers" },
    { name: "Programação", members: 31000, score: 67, reason: "Desenvolvedores" },
    { name: "Negócios Online", members: 44000, score: 79, reason: "Empreendedores online" },
    { name: "Renda Extra", members: 52000, score: 74, reason: "Buscando renda extra" },
    { name: "Marketing de Afiliados", members: 37000, score: 76, reason: "Afiliados" },
    { name: "Funis de Vendas", members: 34000, score: 75, reason: "Especialistas em funis" },
    { name: "Branding Pessoal", members: 30000, score: 70, reason: "Marca pessoal" },
  ];

  return baseGroups.slice(0, 20);
}

function generateTelegramGroups(keywords: string) {
  const baseGroups = [
    { name: "Marketing Digital Brasil", category: "Marketing", score: 85 },
    { name: "Empreendedorismo", category: "Negócios", score: 82 },
    { name: "IA e Tecnologia", category: "Tecnologia", score: 84 },
    { name: "Copywriting", category: "Marketing", score: 78 },
    { name: "Tráfego Pago", category: "Marketing", score: 76 },
    { name: "Produtos Digitais", category: "Produtos", score: 81 },
    { name: "E-commerce", category: "E-commerce", score: 77 },
    { name: "YouTube Brasil", category: "Criadores", score: 72 },
    { name: "Instagram Marketing", category: "Social Media", score: 73 },
    { name: "TikTok Brasil", category: "Social Media", score: 71 },
    { name: "Freelancers", category: "Trabalho", score: 69 },
    { name: "Design", category: "Design", score: 68 },
    { name: "Programação", category: "Tecnologia", score: 67 },
    { name: "Negócios Online", category: "Negócios", score: 79 },
    { name: "Renda Extra", category: "Financeiro", score: 74 },
  ];

  return baseGroups.slice(0, 15);
}

function generateDiscordCommunities(keywords: string) {
  const baseCommunities = [
    { name: "Marketing Digital Brasil", category: "Marketing", score: 85 },
    { name: "Empreendedores", category: "Negócios", score: 82 },
    { name: "IA e Automação", category: "Tecnologia", score: 84 },
    { name: "Copywriting", category: "Marketing", score: 78 },
    { name: "Tráfego Pago", category: "Marketing", score: 76 },
    { name: "Produtos Digitais", category: "Produtos", score: 81 },
    { name: "E-commerce", category: "E-commerce", score: 77 },
    { name: "YouTube Brasil", category: "Criadores", score: 72 },
    { name: "Instagram Marketing", category: "Social Media", score: 73 },
    { name: "TikTok Brasil", category: "Social Media", score: 71 },
  ];

  return baseCommunities.slice(0, 10);
}

function generateHashtags(keywords: string) {
  const baseHashtags = [
    "#marketingdigital",
    "#empreendedorismo",
    "#vendasonline",
    "#produtosdigitais",
    "#copywriting",
    "#tráfegopago",
    "#ecommerce",
    "#dropshipping",
    "#rendaextra",
    "#negóciosonline",
    "#ia",
    "#inteligenciaartificial",
    "#automação",
    "#marketing",
    "#socialmedia",
    "#instagram",
    "#youtube",
    "#tiktok",
    "#freelancer",
    "#trabalhoremoto",
    "#brasil",
    "#empreendedor",
    "#sucesso",
    "#dinheiro",
    "#negócios",
    "#marketingdeafiliados",
    "#funisdevendas",
    "#branding",
    "#marcapessoal",
    "#conversão",
    "#vendas",
    "#lucro",
    "#negocios",
    "#digital",
    "#online",
    "#business",
    "#growth",
    "#escala",
    "#startup",
    "#tecnologia",
    "#inovação",
    "#ferramentas",
    "#produtividade",
    "#gestão",
    "#estratégia",
    "#mkt",
    "#ads",
    "#facebookads",
    "#googleads",
    "#seo",
    "#conteúdo",
    "#criação",
    "#design",
    "#branding",
    "#comunicação",
    "#publicidade",
    "#propaganda",
    "#divulgação",
    "#promoção",
  ];

  return baseHashtags.slice(0, 50);
}

function generateForums(keywords: string) {
  const baseForums = [
    { name: "Reddit - r/brasil", topic: "Geral", score: 75 },
    { name: "Reddit - r/empreendedorismo", topic: "Negócios", score: 82 },
    { name: "Reddit - r/marketing", topic: "Marketing", score: 80 },
    { name: "Quora - Marketing Digital", topic: "Marketing", score: 78 },
    { name: "Quora - Empreendedorismo", topic: "Negócios", score: 81 },
    { name: "Quora - Vendas", topic: "Vendas", score: 77 },
    { name: "ClimaHoje - Empreendedorismo", topic: "Negócios", score: 76 },
    { name: "ClimaHoje - Marketing", topic: "Marketing", score: 74 },
    { name: "Hotmart - Comunidade", topic: "Produtos Digitais", score: 83 },
    { name: "Eduzz - Comunidade", topic: "Produtos Digitais", score: 79 },
    { name: "Monetizze - Comunidade", topic: "Produtos Digitais", score: 77 },
    { name: "Kiwify - Comunidade", topic: "Produtos Digitais", score: 75 },
    { name: "Yampi - Comunidade", topic: "E-commerce", score: 74 },
    { name: "Nuvemshop - Comunidade", topic: "E-commerce", score: 73 },
    { name: "Shopify - Comunidade Brasil", topic: "E-commerce", score: 76 },
    { name: "Loja Integrada - Comunidade", topic: "E-commerce", score: 72 },
    { name: "Rocketseat - Comunidade", topic: "Tecnologia", score: 71 },
    { name: "Alura - Comunidade", topic: "Tecnologia", score: 70 },
    { name: "Digital Innovation One - Comunidade", topic: "Tecnologia", score: 69 },
    { name: "LinkedIn - Grupos de Marketing", topic: "Marketing", score: 68 },
  ];

  return baseForums.slice(0, 20);
}
