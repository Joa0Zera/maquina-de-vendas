"use server";

import { db, products, trends, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/session";

export async function generateTrafficResearchAction(productId: string) {
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

  // Generate traffic research based on product data
  const researchData = generateTrafficResearchData(
    product.title,
    product.description || ""
  );

  // Check if research already exists
  const [existing] = await db
    .select()
    .from(trafficResearch)
    .where(
      and(
        eq(trafficResearch.productId, productId),
        eq(trafficResearch.organizationId, organizationId)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(trafficResearch)
      .set(researchData)
      .where(eq(trafficResearch.id, existing.id));
  } else {
    await db.insert(trafficResearch).values({
      organizationId,
      productId,
      ...researchData,
    });
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/traffic`);
  revalidatePath(`/launches`);

  redirect(`/products/${productId}/traffic`);
}

function generateTrafficResearchData(
  productName: string,
  productDescription: string
) {
  const context = `${productName} ${productDescription}`;

  // Generate keywords (20)
  const keywords = generateKeywords(context);

  // Generate communities (10)
  const communities = generateCommunities(context);

  // Generate YouTube channels (10)
  const youtubeChannels = generateYouTubeChannels(context);

  // Generate competitors (10)
  const competitors = generateCompetitors(context);

  // Generate ad angles (20)
  const adAngles = generateAdAngles(context);

  return {
    keywords,
    communities,
    youtubeChannels,
    competitors,
    adAngles,
  };
}

function generateKeywords(context: string): string[] {
  const baseKeywords = [
    "como vender online",
    "primeira venda digital",
    "marketing digital",
    "vender produtos digitais",
    "negócio online",
    "renda extra",
    "empreendedorismo digital",
    "vendas pela internet",
    "trabalhar de casa",
    "negócio pela internet",
    "vender curso online",
    "marketing de afiliados",
    "funil de vendas",
    "página de vendas",
    "tráfego pago",
    "copywriting",
    "lançamento digital",
    "infoprodutos",
    "criar produto digital",
    "escalar vendas",
  ];

  return baseKeywords.slice(0, 20);
}

function generateCommunities(context: string): Array<{ name: string; platform: string }> {
  return [
    { name: "r/marketing", platform: "reddit" },
    { name: "r/digitalmarketing", platform: "reddit" },
    { name: "r/entrepreneur", platform: "reddit" },
    { name: "r/onlinebusiness", platform: "reddit" },
    { name: "Marketing Digital Brasil", platform: "facebook" },
    { name: "Empreendedores Digitais", platform: "facebook" },
    { name: "Vendas Online", platform: "discord" },
    { name: "Marketing de Afiliados", platform: "telegram" },
    { name: "Funil de Vendas", platform: "telegram" },
    { name: "Copywriting Brasil", platform: "discord" },
  ];
}

function generateYouTubeChannels(context: string): Array<{ name: string; topic: string }> {
  return [
    { name: "Canal Marketing Digital", topic: "Marketing Digital" },
    { name: "Vendas Online Pro", topic: "Vendas" },
    { name: "Empreendedor Digital", topic: "Empreendedorismo" },
    { name: "Copywriting Master", topic: "Copywriting" },
    { name: "Tráfego Pago Brasil", topic: "Tráfego Pago" },
    { name: "Funil de Vendas Expert", topic: "Funil de Vendas" },
    { name: "Infoprodutos Sucesso", topic: "Produtos Digitais" },
    { name: "Lançamentos Digitais", topic: "Lançamentos" },
    { name: "Marketing de Conteúdo", topic: "Marketing de Conteúdo" },
    { name: "Negócios Online", topic: "Negócios Online" },
  ];
}

function generateCompetitors(context: string): Array<{ name: string; reason: string }> {
  return [
    { name: "Produto X", reason: "Mesmo avatar" },
    { name: "Produto Y", reason: "Público similar" },
    { name: "Curso Z", reason: "Mesmo tema" },
    { name: "Mentoria A", reason: "Preço similar" },
    { name: "Programa B", reason: "Mesma promessa" },
    { name: "Treinamento C", reason: "Mesmo formato" },
    { name: "Ebook D", reason: "Mesmo problema" },
    { name: "Comunidade E", reason: "Mesmo resultado" },
    { name: "Sistema F", reason: "Mesma abordagem" },
    { name: "Método G", reason: "Mesmo público" },
  ];
}

function generateAdAngles(context: string): Array<{ headline: string; angle: string }> {
  const angles = [
    { headline: "Pare de perder vendas online", angle: "Dor" },
    { headline: "Descubra como vender seu primeiro produto digital", angle: "Transformação" },
    { headline: "Ganhe R$ 10.000 por mês com produtos digitais", angle: "Ganho Financeiro" },
    { headline: "O método que transformou minha vida financeira", angle: "Transformação" },
    { headline: "Não perca mais tempo tentando vender sozinho", angle: "Economia de Tempo" },
    { headline: "Aprenda com quem já vendeu mais de R$ 1 milhão", angle: "Autoridade" },
    { headline: "O segredo que os gurus não contam sobre vendas", angle: "Curiosidade" },
    { headline: "Comece a vender em 7 dias ou seu dinheiro de volta", angle: "Garantia" },
    { headline: "O sistema que automatiza suas vendas 24/7", angle: "Conveniência" },
    { headline: "Deixe de ser funcionário e seja seu próprio chefe", angle: "Desejo" },
    { headline: "A fórmula exata usada por vendedores de 7 dígitos", angle: "Autoridade" },
    { headline: "Pare de depender de terceiros para vender", angle: "Independência" },
    { headline: "O passo a passo que ninguém te ensinou sobre vendas", angle: "Exclusividade" },
    { headline: "Transforme seu conhecimento em dinheiro", angle: "Transformação" },
    { headline: "A estratégia que gerou R$ 50.000 em 30 dias", angle: "Prova Social" },
    { headline: "Não precisa de experiência para começar", angle: "Facilidade" },
    { headline: "O erro que 90% dos iniciantes cometem ao vender", angle: "Medo" },
    { headline: "Aprenda a vender enquanto dorme", angle: "Desejo" },
    { headline: "O método validado por mais de 10.000 alunos", angle: "Autoridade" },
    { headline: "Comece do zero e construa um império digital", angle: "Transformação" },
  ];

  return angles.slice(0, 20);
}
