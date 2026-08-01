"use server";

import { db, copyAssets, offers, products, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/session";

export async function generateCopyAssetsAction(productId: string) {
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
  const [research] = await db
    .select()
    .from(trafficResearch)
    .where(
      and(
        eq(trafficResearch.productId, productId),
        eq(trafficResearch.organizationId, organizationId)
      )
    )
    .limit(1);

  if (!research) {
    throw new Error("Traffic research not found. Please generate traffic research first.");
  }

  // Fetch offer if exists
  const [offer] = await db
    .select({
      name: offers.name,
    })
    .from(offers)
    .where(and(eq(offers.productId, productId), eq(offers.organizationId, organizationId)))
    .limit(1);

  // Generate copy assets based on product and traffic research
  const copyData = generateCopyAssetsData(
    product.title,
    product.description || "",
    offer?.name || ""
  );

  // Check if copy assets already exist
  const [existing] = await db
    .select()
    .from(copyAssets)
    .where(
      and(
        eq(copyAssets.productId, productId),
        eq(copyAssets.organizationId, organizationId)
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(copyAssets)
      .set(copyData)
      .where(eq(copyAssets.id, existing.id));
  } else {
    await db.insert(copyAssets).values({
      organizationId,
      productId,
      ...copyData,
    });
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath(`/products/${productId}/copy`);
  revalidatePath(`/launches`);

  redirect(`/products/${productId}/copy`);
}

function generateCopyAssetsData(
  productName: string,
  productDescription: string,
  offerName: string
) {
  const context = `${productName} ${productDescription} ${offerName}`;

  // Generate headlines (50)
  const headlines = generateHeadlines(context);

  // Generate ad copies (10)
  const adCopies = generateAdCopies(context);

  // Generate UGC scripts (10)
  const ugcScripts = generateUGCScripts(context);

  // Generate CTAs (20)
  const ctas = generateCTAs(context);

  // Generate email sequence (5)
  const emailSequence = generateEmailSequence(context, productName);

  return {
    headlines,
    adCopies,
    ugcScripts,
    ctas,
    emailSequence,
  };
}

function generateHeadlines(context: string): Array<{ headline: string; type: string }> {
  const types = ["Dor", "Desejo", "Curiosidade", "Autoridade", "Urgência"];
  const headlines: Array<{ headline: string; type: string }> = [];

  const baseHeadlines = [
    { headline: "Pare de perder vendas online", type: "Dor" },
    { headline: "Descubra como vender seu primeiro produto digital", type: "Desejo" },
    { headline: "O segredo que os gurus não contam sobre vendas", type: "Curiosidade" },
    { headline: "Aprenda com quem já vendeu mais de R$ 1 milhão", type: "Autoridade" },
    { headline: "Últimas vagas disponíveis", type: "Urgência" },
    { headline: "Não perca mais tempo tentando vender sozinho", type: "Dor" },
    { headline: "Transforme seu conhecimento em dinheiro", type: "Desejo" },
    { headline: "O método que 90% das pessoas não conhecem", type: "Curiosidade" },
    { headline: "Validado por mais de 10.000 alunos", type: "Autoridade" },
    { headline: "Oferta válida por tempo limitado", type: "Urgência" },
    { headline: "Deixe de ser funcionário e seja seu próprio chefe", type: "Desejo" },
    { headline: "O erro que está te impedindo de vender", type: "Dor" },
    { headline: "Você não vai acreditar no que descobri", type: "Curiosidade" },
    { headline: "Estratégia usada por empresas de 8 dígitos", type: "Autoridade" },
    { headline: "Comece antes que acabe", type: "Urgência" },
    { headline: "Pare de viver de salário", type: "Dor" },
    { headline: "Construa o negócio dos seus sonhos", type: "Desejo" },
    { headline: "A verdade sobre ganhar dinheiro online", type: "Curiosidade" },
    { headline: "Método comprovado cientificamente", type: "Autoridade" },
    { headline: "Só hoje com desconto especial", type: "Urgência" },
    { headline: "Não deixe dinheiro na mesa", type: "Dor" },
    { headline: "Viva a liberdade financeira", type: "Desejo" },
    { headline: "O que ninguém te conta sobre marketing", type: "Curiosidade" },
    { headline: "Recomendado por especialistas", type: "Autoridade" },
    { headline: "Última chance de aproveitar", type: "Urgência" },
    { headline: "Cansado de não ter resultados?", type: "Dor" },
    { headline: "Comece a lucrar hoje mesmo", type: "Desejo" },
    { headline: "Descubra o segredo do sucesso", type: "Curiosidade" },
    { headline: "Usado por top 1% do mercado", type: "Autoridade" },
    { headline: "Vagas limitadas", type: "Urgência" },
    { headline: "Pare de desperdiçar tempo", type: "Dor" },
    { headline: "Alcance seus objetivos financeiros", type: "Desejo" },
    { headline: "O segredo que mudará sua vida", type: "Curiosidade" },
    { headline: "Baseado em dados reais", type: "Autoridade" },
    { headline: "Oferta expira em breve", type: "Urgência" },
    { headline: "Não aceite menos do que merece", type: "Dor" },
    { headline: "Conquiste sua independência", type: "Desejo" },
    { headline: "A técnica que revolucionou o mercado", type: "Curiosidade" },
    { headline: "Desenvolvido por especialistas", type: "Autoridade" },
    { headline: "Aproveite enquanto pode", type: "Urgência" },
    { headline: "Pare de adiar seus sonhos", type: "Dor" },
    { headline: "Transforme sua vida financeira", type: "Desejo" },
    { headline: "O segredo que vai te surpreender", type: "Curiosidade" },
    { headline: "Comprovado por milhares de casos", type: "Autoridade" },
    { headline: "Tempo correndo", type: "Urgência" },
    { headline: "Não fique para trás", type: "Dor" },
    { headline: "Construa seu império digital", type: "Desejo" },
    { headline: "O que você precisa saber agora", type: "Curiosidade" },
    { headline: "Líder do mercado", type: "Autoridade" },
    { headline: "Última oportunidade", type: "Urgência" },
  ];

  return baseHeadlines.slice(0, 50);
}

function generateAdCopies(context: string): Array<{ headline: string; primaryText: string; cta: string }> {
  return [
    {
      headline: "Pare de perder vendas online",
      primaryText: "Descubra o método que transformou a vida de milhares de empreendedores digitais. Aprenda a vender seus produtos de forma consistente e escalável.",
      cta: "Quero aprender",
    },
    {
      headline: "Descubra como vender seu primeiro produto digital",
      primaryText: "O passo a passo completo para criar e vender produtos digitais mesmo sem experiência prévia. Comece do zero e construa seu negócio online.",
      cta: "Começar agora",
    },
    {
      headline: "O segredo que os gurus não contam sobre vendas",
      primaryText: "A estratégia simples que está por trás dos maiores lançamentos digitais. Ninguém te conta isso, mas agora você vai saber.",
      cta: "Descobrir segredo",
    },
    {
      headline: "Aprenda com quem já vendeu mais de R$ 1 milhão",
      primaryText: "Método validado por quem já atingiu resultados de 7 dígitos. Copie a estratégia e aplique no seu negócio hoje mesmo.",
      cta: "Ver método",
    },
    {
      headline: "Últimas vagas disponíveis",
      primaryText: "Não perca a chance de aprender a técnica que está revolucionando o mercado digital. Vagas limitadas para garantir qualidade.",
      cta: "Garantir vaga",
    },
    {
      headline: "Não perca mais tempo tentando vender sozinho",
      primaryText: "Tenha acesso ao sistema que automatiza suas vendas e te permite focar no que realmente importa: criar produtos incríveis.",
      cta: "Começar agora",
    },
    {
      headline: "Transforme seu conhecimento em dinheiro",
      primaryText: "Descubra como monetizar o que você já sabe. Crie produtos digitais e venda para o mundo inteiro 24/7.",
      cta: "Começar",
    },
    {
      headline: "O método que 90% das pessoas não conhecem",
      primaryText: "A técnica que está sendo usada pelo top 1% do mercado e que poucas pessoas têm acesso. Seja um deles.",
      cta: "Conhecer método",
    },
    {
      headline: "Validado por mais de 10.000 alunos",
      primaryText: "Método comprovado por milhares de casos de sucesso. Veja como você pode aplicar a mesma estratégia no seu negócio.",
      cta: "Ver casos",
    },
    {
      headline: "Oferta válida por tempo limitado",
      primaryText: "Aproveite o desconto exclusivo e tenha acesso vitalício ao método. Esta oferta não durará para sempre.",
      cta: "Aproveitar oferta",
    },
  ];
}

function generateUGCScripts(context: string): Array<{ hook: string; problem: string; solution: string; cta: string }> {
  return [
    {
      hook: "Você sabia que 90% das pessoas que tentam vender online fracassam?",
      problem: "Elas tentam fazer tudo sozinhas, sem estratégia, e acabam desistindo após meses sem resultados.",
      solution: "Descobri um método que me permitiu vender mais de R$ 100.000 em produtos digitais em menos de 6 meses.",
      cta: "Clique no link para aprender como",
    },
    {
      hook: "Pare de perder tempo tentando descobrir como vender online",
      problem: "Eu perdi anos tentando descobrir o segredo das vendas digitais sozinho. Foi frustrante e caro.",
      solution: "Até que encontrei um sistema simples que qualquer pessoa pode seguir para começar a vender em dias, não anos.",
      cta: "Acesse o link e comece hoje",
    },
    {
      hook: "O segredo que os gurus não querem que você saiba",
      problem: "Eles vendem o sonho de riqueza fácil, mas não te ensinam o passo a passo real para chegar lá.",
      solution: "Vou te mostrar exatamente como criei meu primeiro produto digital e fiz minha primeira venda em 7 dias.",
      cta: "Clique para descobrir",
    },
    {
      hook: "Você não precisa ser especialista para vender online",
      problem: "Muitas pessoas acham que precisam de anos de experiência para criar produtos digitais. Isso é mentira.",
      solution: "Com o método certo, você pode transformar qualquer conhecimento em um produto vendável em questão de dias.",
      cta: "Veja como no link",
    },
    {
      hook: "Deixei meu emprego e nunca mais olhei para trás",
      problem: "Eu estava preso em um emprego que não me pagava o que eu valia, sem perspectiva de crescimento.",
      solution: "Hoje trabalho de onde quero, quando quero, e ganho muito mais do que jamais imaginei ser possível.",
      cta: "Clique e veja meu método",
    },
    {
      hook: "A verdade sobre ganhar dinheiro online que ninguém te conta",
      problem: "A internet está cheia de promessas falsas e esquemas que só funcionam para quem está vendendo o método.",
      solution: "Vou te mostrar a estratégia real, baseada em dados, que funciona de verdade para qualquer pessoa.",
      cta: "Acesse agora",
    },
    {
      hook: "Não deixe seu conhecimento morrer na sua cabeça",
      problem: "Você sabe coisas que outras pessoas pagariam para aprender. Por que não monetizar isso?",
      solution: "Transforme o que você já sabe em um produto digital e comece a vender enquanto dorme.",
      cta: "Clique para aprender",
    },
    {
      hook: "O erro que está te impedindo de vender online",
      problem: "A maioria das pessoas foca no produto errado, no público errado, com a mensagem errada.",
      solution: "Vou te ensinar a identificar o que as pessoas realmente querem e como entregar para elas.",
      cta: "Veja o erro no link",
    },
    {
      hook: "Comecei com R$ 0 e construí um negócio de 6 dígitos",
      problem: "Não tinha dinheiro para investir, não tinha público, não tinha experiência. Só tinha vontade de aprender.",
      solution: "Seguindo o método certo, consegui escalar meu negócio de zero a mais de R$ 100.000 por mês.",
      cta: "Clique e veja como",
    },
    {
      hook: "Você está a um clique de mudar sua vida financeira",
      problem: "A diferença entre quem tem sucesso e quem não tem é simplesmente ter acesso à informação certa.",
      solution: "Vou te dar exatamente o que você precisa para começar a construir seu império digital hoje.",
      cta: "Clique agora",
    },
  ];
}

function generateCTAs(context: string): string[] {
  return [
    "Quero começar agora",
    "Garantir acesso",
    "Começar hoje",
    "Ver método",
    "Descobrir segredo",
    "Aprender agora",
    "Começar agora mesmo",
    "Quero aprender",
    "Ver casos de sucesso",
    "Aproveitar oferta",
    "Garantir minha vaga",
    "Começar gratuitamente",
    "Ver como funciona",
    "Quero resultados",
    "Acessar agora",
    "Começar minha jornada",
    "Ver o método",
    "Quero mudar minha vida",
    "Acessar treinamento",
    "Começar a vender",
  ];
}

function generateEmailSequence(context: string, productName: string): Array<{ subject: string; body: string }> {
  return [
    {
      subject: "Você está deixando dinheiro na mesa",
      body: `Olá,\n\nVocê sabia que tem conhecimento que outras pessoas pagariam para aprender?\n\nA maioria das pessoas não percebe, mas o que parece óbvio para você pode ser extremamente valioso para outras pessoas.\n\nEis a verdade: você pode transformar o que já sabe em um produto digital e começar a vender 24/7.\n\nNão é complicado. Não precisa ser especialista. Só precisa do método certo.\n\nNa próxima mensagem, vou te mostrar como.\n\nAté logo.`,
    },
    {
      subject: "O problema que ninguém te conta",
      body: `Olá,\n\nAqui está o problema: a maioria das pessoas que tenta vender online fracassa.\n\nNão porque não são capazes. Não porque não têm talento.\n\nMas porque tentam fazer tudo sozinhas, sem estratégia, sem um sistema validado.\n\nElas perdem meses (ou anos) tentando descobrir o que já foi descoberto.\n\nEu sei porque passei por isso.\n\nMas descobri que existe um caminho mais curto. Um caminho que qualquer pessoa pode seguir.\n\nNa próxima mensagem, vou te mostrar a solução.\n\nAté logo.`,
    },
    {
      subject: "A solução que mudou tudo para mim",
      body: `Olá,\n\nA solução é simples: pare de reinventar a roda.\n\nUse um método que já foi validado por milhares de pessoas. Um método que funciona de verdade.\n\nUm método que te permite:\n\n1. Identificar o que as pessoas realmente querem\n2. Criar um produto que resolva o problema delas\n3. Vender esse produto de forma consistente\n\nNão é mágica. É estratégia.\n\nE na próxima mensagem, vou te mostrar a prova de que funciona.\n\nAté logo.`,
    },
    {
      subject: "Prova real de que funciona",
      body: `Olá,\n\nEste método já foi usado por mais de 10.000 alunos para criar seus primeiros produtos digitais.\n\nAlguns deles:\n\n- Venderam mais de R$ 100.000 em 6 meses\n- Deixaram seus empregos para trabalhar online\n- Construíram negócios de 6 dígitos\n\nNão são casos isolados. Não são exceções.\n\nSão pessoas comuns que aplicaram um método extraordinário.\n\nE você pode fazer o mesmo.\n\nNa próxima mensagem, vou te fazer uma oferta especial.\n\nAté logo.`,
    },
    {
      subject: "Sua chance de começar hoje",
      body: `Olá,\n\nAqui está a oferta:\n\nAcesso completo ao método que vai te ensinar a transformar seu conhecimento em produtos digitais vendáveis.\n\nPasso a passo. Sem enrolação. Sem teoria desnecessária.\n\nApenas o que você precisa para começar a vender online.\n\nEsta oferta é válida por tempo limitado.\n\nClique no link abaixo e comece sua jornada hoje.\n\n[LINK]\n\nSe você não começar agora, quando vai começar?\n\nAté logo.`,
    },
  ];
}
