import { Offer } from "@maquina/database";

export interface EbookStructure {
  title: string;
  subtitle: string;
  introduction: string;
  conclusion: string;
  chapters: Array<{
    chapterTitle: string;
    chapterSummary: string;
  }>;
}

/**
 * Generate a complete ebook structure from an offer using deterministic templates.
 * This is a placeholder for future AI integration.
 */
export function generateEbookFromOffer(offer: Offer): EbookStructure {
  const copy = offer.copy as {
    targetAudience?: string;
    problem?: string;
    desiredOutcome?: string;
    trendTitle?: string;
    ebookStructure?: string[];
  } || {};

  const productName = offer.name;
  const headline = offer.headline || productName;
  const targetAudience = copy.targetAudience || "profissionais";
  const problem = copy.problem || "desafios comuns";
  const desiredOutcome = copy.desiredOutcome || "resultados melhores";
  const trendTitle = copy.trendTitle || "";
  const existingStructure = copy.ebookStructure || [];

  // Generate title
  const title = generateTitle(productName, headline);

  // Generate subtitle
  const subtitle = generateSubtitle(targetAudience, desiredOutcome);

  // Generate introduction
  const introduction = generateIntroduction(productName, problem, desiredOutcome);

  // Generate conclusion
  const conclusion = generateConclusion(productName, desiredOutcome);

  // Generate chapters (8 to 12 chapters)
  const chapters = generateChapters(productName, targetAudience, problem, desiredOutcome, existingStructure);

  return {
    title,
    subtitle,
    introduction,
    conclusion,
    chapters,
  };
}

function generateTitle(productName: string, headline: string): string {
  const templates = [
    () => headline,
    () => `O Guia Definitivo de ${productName}`,
    () => `Domine ${productName}: Do Zero ao Avançado`,
    () => `${productName}: Estratégias Comprovadas`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : headline;
}

function generateSubtitle(targetAudience: string, desiredOutcome: string): string {
  const templates = [
    () => `O sistema completo para ${targetAudience.toLowerCase()} que buscam ${desiredOutcome.toLowerCase()}`,
    () => `Descubra como ${targetAudience.toLowerCase()} podem alcançar ${desiredOutcome.toLowerCase()} com este método`,
    () => `Transforme sua jornada rumo a ${desiredOutcome.toLowerCase()} com estratégias práticas`,
    () => `O passo a passo que ${targetAudience.toLowerCase()} precisam para ${desiredOutcome.toLowerCase()}`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : `O sistema completo para ${targetAudience.toLowerCase()}`;
}

function generateIntroduction(productName: string, problem: string, desiredOutcome: string): string {
  const templates = [
    () => `Bem-vindo ao ${productName}. Se você está cansado de ${problem.toLowerCase()}, você está no lugar certo. Este livro foi desenvolvido para ajudá-lo a alcançar ${desiredOutcome.toLowerCase()} de forma estruturada e eficiente. Ao longo das próximas páginas, você descobrirá estratégias comprovadas que já ajudaram centenas de pessoas a transformar seus resultados.`,
    () => `Parabéns por dar o primeiro passo. ${productName} é o resultado de anos de experiência e testes. Neste livro, condensamos tudo o que você precisa saber para superar ${problem.toLowerCase()} e alcançar ${desiredOutcome.toLowerCase()}. Cada capítulo foi cuidadosamente elaborado para guiar você em sua jornada de transformação.`,
    () => `Você está prestes a descobrir o segredo para ${desiredOutcome.toLowerCase()}. ${productName} não é apenas mais um livro - é um sistema completo desenvolvido para quem enfrenta ${problem.toLowerCase()} e busca resultados reais. Prepare-se para uma jornada que vai mudar sua perspectiva e seus resultados.`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : `Bem-vindo ao ${productName}. Este livro foi desenvolvido para ajudá-lo a alcançar ${desiredOutcome.toLowerCase()}.`;
}

function generateConclusion(productName: string, desiredOutcome: string): string {
  const templates = [
    () => `Você chegou ao final de ${productName}, mas sua jornada apenas começa. Agora que você tem todas as ferramentas e estratégias necessárias para alcançar ${desiredOutcome.toLowerCase()}, é hora de colocar em prática. Lembre-se: conhecimento sem ação é apenas informação. Comece hoje mesmo e veja os resultados se acumularem.`,
    () => `Parabéns por completar ${productName}. Você agora possui um sistema completo para alcançar ${desiredOutcome.toLowerCase()}. O que você faz com este conhecimento depende inteiramente de você. Recomendo revisar os capítulos, implementar as estratégias e acompanhar seus resultados. O sucesso está na consistência.`,
    () => `Este foi apenas o começo. ${productName} lhe deu a base para alcançar ${desiredOutcome.toLowerCase()}, mas o verdadeiro trabalho acontece agora. Implemente o que aprendeu, teste as estratégias, ajuste conforme necessário e, acima de tudo, não desista. Sua jornada rumo ao sucesso está em suas mãos.`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : `Você chegou ao final de ${productName}. Agora é hora de colocar em prática o que aprendeu para alcançar ${desiredOutcome.toLowerCase()}.`;
}

function generateChapters(
  productName: string,
  targetAudience: string,
  problem: string,
  desiredOutcome: string,
  existingStructure: string[]
): Array<{ chapterTitle: string; chapterSummary: string }> {
  // If existing structure is provided, use it
  if (existingStructure.length > 0) {
    return existingStructure.map((chapterTitle) => ({
      chapterTitle,
      chapterSummary: generateChapterSummary(chapterTitle, productName, targetAudience),
    }));
  }

  // Generate 8 to 12 chapters deterministically
  const chapterCount = 8 + Math.floor(Math.random() * 5); // 8 to 12

  const baseChapters = [
    {
      chapterTitle: "Introdução ao Método",
      chapterSummary: `Entenda os fundamentos do ${productName} e por que ele funciona para ${targetAudience.toLowerCase()}.`,
    },
    {
      chapterTitle: "Diagnóstico da Situação Atual",
      chapterSummary: `Identifique onde você está hoje e por que ${problem.toLowerCase()} está impedindo seu progresso.`,
    },
    {
      chapterTitle: "Definindo Seus Objetivos",
      chapterSummary: `Estabeleça metas claras e mensuráveis para ${desiredOutcome.toLowerCase()} usando o método SMART.`,
    },
    {
      chapterTitle: "A Mentalidade do Sucesso",
      chapterSummary: `Desenvolva a mentalidade necessária para superar obstáculos e alcançar ${desiredOutcome.toLowerCase()}.`,
    },
    {
      chapterTitle: "Estratégias Fundamentais",
      chapterSummary: `Aprenda as estratégias essenciais do ${productName} que formam a base do sucesso.`,
    },
    {
      chapterTitle: "Técnicas Avançadas",
      chapterSummary: `Domine as técnicas avançadas que separam os amadores dos profissionais em ${desiredOutcome.toLowerCase()}.`,
    },
    {
      chapterTitle: "Implementação Prática",
      chapterSummary: `Coloque em prática tudo o que aprendeu com um plano de ação passo a passo.`,
    },
    {
      chapterTitle: "Superando Obstáculos",
      chapterSummary: `Aprenda a identificar e superar os obstáculos comuns no caminho para ${desiredOutcome.toLowerCase()}.`,
    },
    {
      chapterTitle: "Mantendo a Consistência",
      chapterSummary: `Desenvolva hábitos e rotinas que garantem resultados consistentes a longo prazo.`,
    },
    {
      chapterTitle: "Medindo Resultados",
      chapterSummary: `Acompanhe seu progresso e ajuste suas estratégias para maximizar ${desiredOutcome.toLowerCase()}.`,
    },
    {
      chapterTitle: "Escalando Seus Resultados",
      chapterSummary: `Descubra como multiplicar seus resultados e levar ${desiredOutcome.toLowerCase()} ao próximo nível.`,
    },
    {
      chapterTitle: "Conclusão e Próximos Passos",
      chapterSummary: `Revise tudo o que aprendeu e prepare-se para sua jornada rumo a ${desiredOutcome.toLowerCase()}.`,
    },
  ];

  // Return the first chapterCount chapters
  return baseChapters.slice(0, chapterCount);
}

function generateChapterSummary(chapterTitle: string, productName: string, targetAudience: string): string {
  const templates = [
    () => `Neste capítulo, você descobrirá como ${chapterTitle.toLowerCase()} se aplica ao ${productName} e como ${targetAudience.toLowerCase()} podem aplicar esses conceitos.`,
    () => `Aprenda os fundamentos de ${chapterTitle.toLowerCase()} no contexto do ${productName} e veja exemplos práticos.`,
    () => `Explore ${chapterTitle.toLowerCase()} em profundidade com estratégias específicas para ${targetAudience.toLowerCase()}.`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : `Neste capítulo, você aprenderá sobre ${chapterTitle.toLowerCase()}.`;
}
