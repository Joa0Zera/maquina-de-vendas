import { Trend } from "@maquina/database";

export interface GeneratedProduct {
  productName: string;
  headline: string;
  subheadline: string;
  bigPromise: string;
  uniqueMechanism: string;
  targetAudience: string;
  problem: string;
  desiredOutcome: string;
  objectionHandling: string[];
  guarantee: string;
  offerStack: string[];
  ebookStructure: string[];
  qualityScore: number;
}

// Domain-specific mappings
const DOMAIN_MAPPINGS = {
  ai: {
    keywords: ["ai", "artificial", "intelligence", "machine", "learning", "chatgpt", "gpt", "llm", "automation", "bot", "ia", "inteligência"],
    productNameSuffixes: ["IA Pro", "Kit IA Freelancer", "Método IA Produtiva", "Automação IA"],
    promises: [
      "Automatize tarefas repetitivas em minutos",
      "Entregue projetos em metade do tempo usando IA",
      "Reduza workload em 70% com automação inteligente",
      "Crie conteúdo 10x mais rápido com IA",
    ],
    audiences: [
      "Freelancers, designers, copywriters e profissionais autônomos",
      "Empreendedores digitais e criadores de conteúdo",
      "Equipes de marketing e vendas",
      "Desenvolvedores e profissionais de tecnologia",
    ],
    problems: [
      "Excesso de tarefas operacionais reduz lucro e escala",
      "Dificuldade em manter consistência na produção de conteúdo",
      "Processos manuais consomem tempo que deveria ser focado em estratégia",
      "Sobrecarga de trabalho impede crescimento do negócio",
    ],
    outcomes: [
      "Mais clientes atendidos com menos horas trabalhadas",
      "Produção de conteúdo automatizada e escalável",
      "Foco em estratégia enquanto IA cuida do operacional",
      "Crescimento de receita sem aumentar equipe",
    ],
  },
  marketing: {
    keywords: ["marketing", "digital", "social", "media", "ad", "ads", "campaign", "funnel", "conversion", "lead", "growth", "crescimento", "vendas"],
    productNameSuffixes: ["Marketing Digital Pro", "Kit Crescimento", "Funil de Vendas", "Sistema Conversão"],
    promises: [
      "Multiplique suas conversões com funis otimizados",
      "Gere leads qualificados automaticamente",
      "Escale suas campanhas de forma previsível",
      "Domine o marketing digital em 30 dias",
    ],
    audiences: [
      "Empresários e donos de pequenos negócios",
      "Profissionais de marketing digital",
      "E-commerce e lojas virtuais",
      "Agências de marketing e consultores",
    ],
    problems: [
      "Custo de aquisição de cliente muito alto",
      "Dificuldade em escalar campanhas de forma consistente",
      "Falta de sistema previsível para geração de leads",
      "Investimento em marketing sem retorno claro",
    ],
    outcomes: [
      "CAC reduzido em 50% com funis otimizados",
      "Fluxo constante de leads qualificados",
      "Crescimento previsível e escalável de receita",
      "ROI positivo em todas as campanhas",
    ],
  },
  ecommerce: {
    keywords: ["ecommerce", "e-commerce", "store", "shop", "sales", "dropshipping", "shopify", "product", "inventory", "shipping", "loja", "vendas", "e-commerce"],
    productNameSuffixes: ["E-commerce Pro", "Kit Loja Virtual", "Sistema Vendas", "Método E-commerce"],
    promises: [
      "Escale sua loja virtual para 6 dígitos mensais",
      "Automatize todo o processo de vendas online",
      "Transforme visitantes em compradores fiéis",
      "Crie um e-commerce lucrativo do zero",
    ],
    audiences: [
      "Donos de e-commerce e lojas virtuais",
      "Empreendedores querendo começar a vender online",
      "Dropshippers e vendedores de marketplace",
      "Pequenos varejistas migrando para online",
    ],
    problems: [
      "Taxa de conversão muito baixa",
      "Gestão complexa de estoque e pedidos",
      "Custo de anúncios inviabiliza margem de lucro",
      "Dificuldade em fidelizar clientes",
    ],
    outcomes: [
      "Conversão aumentada em 300% com otimizações",
      "Processo de vendas 100% automatizado",
      "Base de clientes recorrente e fiéis",
      "Margem de lucro saudável e sustentável",
    ],
  },
  freelancers: {
    keywords: ["freelance", "freelancer", "remote", "work", "independent", "contractor", "gig", "upwork", "fiverr", "freela", "autônomo", "remoto"],
    productNameSuffixes: ["Freelancer Pro", "Kit Autônomo", "Método Freelancer", "Sistema Remoto"],
    promises: [
      "Dobre seus ganhos como freelancer em 90 dias",
      "Construa um portfólio de clientes recorrentes",
      "Escape da instabilidade com contratos previsíveis",
      "Transforme habilidades em negócio escalável",
    ],
    audiences: [
      "Freelancers de todas as áreas",
      "Profissionais autônomos e consultores",
      "Pessoas querendo sair do emprego formal",
      "Trabalhadores remotos e nômades digitais",
    ],
    problems: [
      "Instabilidade de renda mês a mês",
      "Dificuldade em conseguir clientes de qualidade",
      "Preços baixos e concorrência desleal",
      "Falta de sistema para escalar serviços",
    ],
    outcomes: [
      "Renda mensal previsível e crescente",
      "Carteira de clientes fiéis e recorrentes",
      "Preços premium justificados por valor entregue",
      "Negócio escalável sem depender de horas",
    ],
  },
  creators: {
    keywords: ["creator", "content", "youtube", "tiktok", "instagram", "influencer", "brand", "audience", "monetize", "criador", "conteúdo", "influenciador"],
    productNameSuffixes: ["Criador Pro", "Kit Influenciador", "Método Conteúdo", "Sistema Marca"],
    promises: [
      "Monetize seu público em 30 dias",
      "Crie conteúdo viral de forma consistente",
      "Transforme seguidores em clientes fiéis",
      "Construa uma marca pessoal lucrativa",
    ],
    audiences: [
      "Criadores de conteúdo e influenciadores",
      "Youtubers e streamers",
      "Profissionais de redes sociais",
      "Pessoas querendo construir marca pessoal",
    ],
    problems: [
      "Muitos seguidores mas pouca monetização",
      "Burnout criativo por pressão constante",
      "Algoritmos imprevisíveis afetando alcance",
      "Dificuldade em converter engajamento em vendas",
    ],
    outcomes: [
      "Múltiplas fontes de renda do público",
      "Sistema de conteúdo sustentável e escalável",
      "Independência de algoritmos com audiência própria",
      "Conversão alta de seguidores para clientes",
    ],
  },
  infoproducts: {
    keywords: ["infoproduct", "ebook", "course", "digital", "product", "knowledge", "teach", "education", "learning", "infoproduto", "curso", "conhecimento"],
    productNameSuffixes: ["Infoproduto Pro", "Kit Curso Online", "Método Digital", "Sistema Conhecimento"],
    promises: [
      "Crie e venda infoprodutos lucrativos",
      "Transforme seu conhecimento em renda passiva",
      "Lance um curso online em 30 dias",
      "Escale seu negócio de educação digital",
    ],
    audiences: [
      "Especialistas e profissionais com conhecimento valioso",
      "Professores e educadores",
      "Consultores e coaches",
      "Pessoas querendo monetizar expertise",
    ],
    problems: [
      "Conhecimento valioso mas não sabe monetizar",
      "Dificuldade em estruturar e criar conteúdo didático",
      "Medo de gravar e aparecer em vídeo",
      "Não sabe como lançar e vender curso",
    ],
    outcomes: [
      "Renda passiva com infoprodutos escaláveis",
      "Sistema validado de criação de conteúdo",
      "Confiança para gravar e lançar produtos",
      "Funil de vendas automatizado para cursos",
    ],
  },
  productivity: {
    keywords: ["productivity", "time", "manage", "focus", "efficient", "organize", "habit", "routine", "goal", "achieve", "produtividade", "tempo", "foco", "eficiência"],
    productNameSuffixes: ["Produtividade Pro", "Kit Foco", "Método Tempo", "Sistema Eficiência"],
    promises: [
      "Triple sua produtividade em 7 dias",
      "Elimine distrações e foque no que importa",
      "Conquiste mais objetivos com menos esforço",
      "Domine seu tempo e sua vida",
    ],
    audiences: [
      "Profissionais sobrecarregados de trabalho",
      "Empreendedores com muitas responsabilidades",
      "Estudantes e acadêmicos",
      "Qualquer pessoa querendo ser mais eficiente",
    ],
    problems: [
      "Procrastinação constante e falta de foco",
      "Muitas tarefas e pouco tempo",
      "Sensação de nunca dar conta de tudo",
      "Burnout por excesso de trabalho",
    ],
    outcomes: [
      "Conclusão de tarefas em metade do tempo",
      "Foco laser no que realmente importa",
      "Sensação de controle sobre sua agenda",
      "Equilíbrio entre trabalho e vida pessoal",
    ],
  },
  saas: {
    keywords: ["saas", "software", "startup", "tech", "app", "platform", "subscription", "mrr", "churn", "recurring", "software", "plataforma", "assinatura"],
    productNameSuffixes: ["SaaS Pro", "Kit Startup", "Método Software", "Sistema Plataforma"],
    promises: [
      "Lance seu SaaS em 30 dias",
      "Escale seu software para 10k usuários",
      "Reduza churn e aumente MRR",
      "Transforme ideia em produto rentável",
    ],
    audiences: [
      "Fundadores de startups SaaS",
      "Desenvolvedores querendo criar produtos",
      "Empresários de software",
      "Pessoas com ideias de apps",
    ],
    problems: [
      "Dificuldade em validar ideia antes de construir",
      "Churn alto cancelando crescimento",
      "Não sabe como adquirir primeiros clientes",
      "Produto pronto mas sem tráfego",
    ],
    outcomes: [
      "Validação rápida com MVP funcional",
      "Churn reduzido em 50% com onboarding",
      "Base de usuários pagantes crescente",
      "Tráfego qualificado para seu produto",
    ],
  },
  sales: {
    keywords: ["sales", "sell", "selling", "closing", "deal", "revenue", "commission", "negotiation", "pitch", "proposal", "vendas", "fechamento", "receita", "negociação"],
    productNameSuffixes: ["Vendas Pro", "Kit Fechamento", "Método Receita", "Sistema Negociação"],
    promises: [
      "Feche 3x mais vendas com técnicas comprovadas",
      "Domine a arte da negociação em 30 dias",
      "Transforme leads em clientes fiéis",
      "Aumente sua receita em 50% este trimestre",
    ],
    audiences: [
      "Vendedores e comerciais",
      "Empresários que precisam vender",
      "Consultores e prestadores de serviço",
      "Profissionais de liberação e fechamento",
    ],
    problems: [
      "Muitos leads mas poucos fechamentos",
      "Medo de pedir preço alto",
      "Objeções que não sabe como contornar",
      "Processo de vendas desorganizado e ineficiente",
    ],
    outcomes: [
      "Taxa de fechamento aumentada em 200%",
      "Confiança para cobrar preço premium",
      "Sistema estruturado para contornar objeções",
      "Funil de vendas previsível e escalável",
    ],
  },
};

type DomainKey = keyof typeof DOMAIN_MAPPINGS;

/**
 * Generate a product from a trend using deterministic templates.
 * This is a placeholder for future AI integration.
 */
export function generateProductFromTrend(trend: Trend): GeneratedProduct {
  const title = trend.title.toLowerCase();
  
  // Detect domain from trend title
  const domain = detectDomain(title);
  
  // Extract keywords from the trend title
  const keywords = extractKeywords(title);
  
  // Generate product name
  const productName = generateProductName(keywords, domain);
  
  // Generate headline using direct-response formulas
  const headline = generateHeadline(keywords, domain);
  
  // Generate subheadline
  const subheadline = generateSubheadline(keywords, domain);
  
  // Generate big promise
  const bigPromise = generateBigPromise(keywords, domain);
  
  // Generate unique mechanism
  const uniqueMechanism = generateUniqueMechanism(keywords, domain);
  
  // Generate target audience
  const targetAudience = generateTargetAudience(keywords, domain);
  
  // Generate problem
  const problem = generateProblem(keywords, domain);
  
  // Generate desired outcome
  const desiredOutcome = generateDesiredOutcome(keywords, domain);
  
  // Generate objection handling
  const objectionHandling = generateObjectionHandling(keywords, domain);
  
  // Generate guarantee
  const guarantee = generateGuarantee(keywords, domain);
  
  // Generate offer stack
  const offerStack = generateOfferStack(keywords, domain);
  
  // Generate ebook structure
  const ebookStructure = generateEbookStructure(keywords, domain);
  
  // Calculate quality score
  const qualityScore = calculateQualityScore(keywords, domain, title);
  
  return {
    productName,
    headline,
    subheadline,
    bigPromise,
    uniqueMechanism,
    targetAudience,
    problem,
    desiredOutcome,
    objectionHandling,
    guarantee,
    offerStack,
    ebookStructure,
    qualityScore,
  };
}

function detectDomain(title: string): DomainKey | null {
  for (const [key, mapping] of Object.entries(DOMAIN_MAPPINGS)) {
    for (const keyword of mapping.keywords) {
      if (title.includes(keyword)) {
        return key as DomainKey;
      }
    }
  }
  return null;
}

function extractKeywords(title: string): string[] {
  const commonWords = ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "as", "is", "was", "are", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "must", "shall", "can", "need", "dare", "ought", "used", "to", "it", "this", "that", "these", "those", "i", "you", "he", "she", "we", "they", "what", "which", "who", "whom", "when", "where", "why", "how", "all", "each", "every", "both", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "just", "also", "now", "here", "there", "then", "once", "never", "always", "often", "still", "already", "again", "new", "old", "good", "bad", "best", "better", "worse", "worst", "first", "last", "long", "short", "high", "low", "big", "small", "great", "little", "many", "much", "less", "more", "most", "least", "para", "de", "em", "com", "sem", "por", "para", "como", "mais", "menos", "muito", "pouco", "também", "já", "agora", "aqui", "lá", "então", "depois", "antes", "sempre", "nunca", "assim", "então", "porque", "quando", "onde", "como", "qual", "quem"];
  
  return title
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .map(word => word.replace(/[^a-z0-9àáâãéèêíïóôõöúç]/g, ""))
    .filter(word => word.length > 0);
}

function generateProductName(keywords: string[], domain: DomainKey | null): string {
  const mainKeyword = keywords[0] || "Pro";
  
  if (domain && DOMAIN_MAPPINGS[domain]) {
    const suffixes = DOMAIN_MAPPINGS[domain].productNameSuffixes;
    const index = Math.floor(Math.random() * suffixes.length);
    const suffix = suffixes[index];
    return capitalizeFirst(mainKeyword) + " " + suffix;
  }
  
  // Fallback for unknown domains
  const templates = [
    () => capitalizeFirst(mainKeyword) + " Completo",
    () => capitalizeFirst(mainKeyword) + " Guia",
    () => capitalizeFirst(mainKeyword) + " Método",
    () => "Sistema " + capitalizeFirst(mainKeyword),
  ];
  
  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : capitalizeFirst(mainKeyword) + " Completo";
}

function generateBigPromise(keywords: string[], domain: DomainKey | null): string {
  const mainKeyword = keywords[0] || "este método";
  
  if (domain && DOMAIN_MAPPINGS[domain]) {
    const promises = DOMAIN_MAPPINGS[domain].promises;
    const index = Math.floor(Math.random() * promises.length);
    return promises[index] || `Domine ${mainKeyword} em 30 dias`;
  }
  
  // Fallback for unknown domains
  const templates = [
    () => `Domine ${mainKeyword} em 30 dias`,
    () => `O guia completo sobre ${mainKeyword}`,
    () => `Transforme seus resultados com ${mainKeyword}`,
  ];
  
  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : `Domine ${mainKeyword} em 30 dias`;
}

function generateTargetAudience(keywords: string[], domain: DomainKey | null): string {
  if (domain && DOMAIN_MAPPINGS[domain]) {
    const audiences = DOMAIN_MAPPINGS[domain].audiences;
    const index = Math.floor(Math.random() * audiences.length);
    return audiences[index] || "Empreendedores e donos de negócios";
  }
  
  // Fallback for unknown domains
  const templates = [
    () => "Empreendedores e donos de negócios",
    () => "Profissionais liberais e autônomos",
    () => "Pessoas buscando crescimento pessoal",
    () => "Equipes e organizações",
  ];
  
  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : "Empreendedores e donos de negócios";
}

function generateProblem(keywords: string[], domain: DomainKey | null): string {
  if (domain && DOMAIN_MAPPINGS[domain]) {
    const problems = DOMAIN_MAPPINGS[domain].problems;
    const index = Math.floor(Math.random() * problems.length);
    return problems[index] || "Falta de tempo para implementar mudanças";
  }
  
  // Fallback for unknown domains
  const templates = [
    () => "Falta de tempo para implementar mudanças",
    () => "Sobrecarga de informações e paralisia",
    () => "Dificuldade em ver resultados concretos",
    () => "Não sabe por onde começar",
  ];
  
  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : "Falta de tempo para implementar mudanças";
}

function generateDesiredOutcome(keywords: string[], domain: DomainKey | null): string {
  if (domain && DOMAIN_MAPPINGS[domain]) {
    const outcomes = DOMAIN_MAPPINGS[domain].outcomes;
    const index = Math.floor(Math.random() * outcomes.length);
    return outcomes[index] || "Mais resultados com menos esforço";
  }
  
  // Fallback for unknown domains
  const templates = [
    () => "Mais resultados com menos esforço",
    () => "Crescimento sustentável e previsível",
    () => "Equilíbrio entre vida e trabalho",
    () => "Independência financeira",
  ];
  
  const index = Math.floor(Math.random() * templates.length);
  const template = templates[index];
  return template ? template() : "Mais resultados com menos esforço";
}

function generateEbookStructure(keywords: string[], domain: DomainKey | null): string[] {
  const mainKeyword = capitalizeFirst(keywords[0] || "o Tema");
  
  const domainSpecificChapters: Record<DomainKey, string[]> = {
    ai: [
      "Introdução: A Revolução da IA",
      "Entendendo Ferramentas de IA",
      "Automação de Tarefas Repetitivas",
      "Criação de Conteúdo com IA",
      "Integração no Seu Fluxo de Trabalho",
      "Casos de Uso Práticos",
      "Ferramentas Essenciais",
      "Métricas e Resultados",
      "Escalando com IA",
      "Futuro da IA no Seu Negócio",
    ],
    marketing: [
      "Introdução: Marketing Digital Moderno",
      "Fundamentos de Funis de Vendas",
      "Geração de Leads Qualificados",
      "Otimização de Conversão",
      "Estratégias de Tráfego Pago",
      "Marketing de Conteúdo",
      "Email Marketing Automatizado",
      "Análise de Dados",
      "Escalando Campanhas",
      "Conclusão: Próximos Passos",
    ],
    ecommerce: [
      "Introdução: E-commerce Lucrativo",
      "Escolhendo Seu Nicho",
      "Criação de Loja Virtual",
      "Seleção de Produtos",
      "Fotografia e Descrição",
      "Estratégias de Preço",
      "Marketing para E-commerce",
      "Logística e Entrega",
      "Atendimento ao Cliente",
      "Escalando Suas Vendas",
    ],
    freelancers: [
      "Introdução: Liberdade como Freelancer",
      "Definindo Seus Serviços",
      "Preço e Posicionamento",
      "Portfólio que Vende",
      "Encontrando Clientes",
      "Propostas Irresistíveis",
      "Gestão de Projetos",
      "Fidelização de Clientes",
      "Escalando sem Burnout",
      "Construindo Negócio Sustentável",
    ],
    creators: [
      "Introdução: Economia de Criadores",
      "Encontrando Sua Voz",
      "Estratégia de Conteúdo",
      "Plataformas e Algoritmos",
      "Engajamento Autêntico",
      "Monetização do Público",
      "Parcerias e Colaborações",
      "Brand Deals",
      "Construindo Comunidade",
      "Longevidade como Criador",
    ],
    infoproducts: [
      "Introdução: Economia do Conhecimento",
      "Validando Sua Ideia",
      "Estrutura de Curso",
      "Criando Conteúdo Didático",
      "Produção de Vídeo",
      "Plataformas de Venda",
      "Lançamento de Produto",
      "Funil de Vendas",
      "Sucesso do Aluno",
      "Escalando Infoprodutos",
    ],
    productivity: [
      "Introdução: Domine Seu Tempo",
      "Identificando Distrações",
      "Sistema de Priorização",
      "Gestão de Energia",
      "Hábitos de Alta Performance",
      "Ferramentas de Produtividade",
      "Ambiente de Trabalho",
      "Rotinas Matinais",
      "Equilíbrio Vida-Trabalho",
      "Manutenção de Resultados",
    ],
    saas: [
      "Introdução: Mundo SaaS",
      "Validação de Ideia",
      "Construindo MVP",
      "Design de Produto",
      "Desenvolvimento Técnico",
      "Lançamento Beta",
      "Aquisição de Usuários",
      "Onboarding e Retenção",
      "Monetização e Pricing",
      "Escalando Startup",
    ],
    sales: [
      "Introdução: Arte de Vender",
      "Mindset de Vendedor",
      "Processo de Vendas",
      "Qualificação de Leads",
      "Apresentação de Valor",
      "Contornando Objeções",
      "Técnicas de Fechamento",
      "Follow-up Estratégico",
      "Construindo Relacionamento",
      "Escalando Receita",
    ],
  };
  
  const baseChapters = domain && domainSpecificChapters[domain]
    ? domainSpecificChapters[domain]
    : [
      "Introdução: Por Que Isso Importa",
      `Entendendo ${mainKeyword}`,
      "Erros Comuns a Evitar",
      "O Framework Comprovado",
      "Implementação Passo a Passo",
      "Estratégias Avançadas",
      "Estudos de Caso",
      "Medindo Sucesso",
      "Escalando Resultados",
      "Conclusão: Próximos Passos",
    ];
  
  // Return 5-10 chapters randomly
  const numChapters = Math.floor(Math.random() * 6) + 5;
  return baseChapters.slice(0, numChapters);
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function calculateQualityScore(keywords: string[], domain: DomainKey | null, title: string): number {
  let score = 50; // Base score
  
  // Domain detection bonus
  if (domain) {
    score += 20;
  }
  
  // Keyword count bonus
  if (keywords.length >= 3) {
    score += 15;
  } else if (keywords.length >= 2) {
    score += 10;
  } else if (keywords.length >= 1) {
    score += 5;
  }
  
  // Title length bonus
  if (title.length >= 30) {
    score += 10;
  } else if (title.length >= 20) {
    score += 5;
  }
  
  // Portuguese language detection bonus (has Portuguese characters)
  if (/[àáâãéèêíïóôõöúç]/i.test(title)) {
    score += 5;
  }
  
  return Math.min(score, 100);
}

function generateHeadline(keywords: string[], domain: DomainKey | null): string {
  const mainKeyword = capitalizeFirst(keywords[0] || "Este Método");
  
  if (domain && DOMAIN_MAPPINGS[domain]) {
    const headlines = DOMAIN_MAPPINGS[domain].promises;
    const index = Math.floor(Math.random() * headlines.length);
    const selected = headlines[index];
    return selected || `Descubra Como ${mainKeyword} Pode Transformar Sua Vida`;
  }
  
  // Direct-response headline formulas (fallback)
  const formulas = [
    () => `Como ${mainKeyword} Pode Mudar Sua Vida Em 30 Dias`,
    () => `O Segredo Para ${mainKeyword} Que Ninguém Conta`,
    () => `Descubra o Método Comprovado Para ${mainKeyword}`,
    () => `${mainKeyword}: A Verdade Que Eles Não Querem Que Você Saiba`,
  ];
  
  const index = Math.floor(Math.random() * formulas.length);
  const template = formulas[index];
  return template ? template() : `Como ${mainKeyword} Pode Mudar Sua Vida Em 30 Dias`;
}

function generateSubheadline(keywords: string[], domain: DomainKey | null): string {
  const mainKeyword = capitalizeFirst(keywords[0] || "este método");
  
  if (domain && DOMAIN_MAPPINGS[domain]) {
    const audiences = DOMAIN_MAPPINGS[domain].audiences;
    const index = Math.floor(Math.random() * audiences.length);
    const audience = audiences[index] || "profissionais";
    return `O sistema completo desenvolvido especificamente para ${audience.toLowerCase()} que buscam resultados reais com ${mainKeyword.toLowerCase()}.`;
  }
  
  return `Aprenda a estratégia passo a passo que já ajudou centenas de pessoas a dominar ${mainKeyword.toLowerCase()} e alcançar resultados extraordinários.`;
}

function generateUniqueMechanism(keywords: string[], domain: DomainKey | null): string {
  const mainKeyword = capitalizeFirst(keywords[0] || "este método");
  
  const mechanisms = [
    `O Sistema de 3 Fases Para ${mainKeyword}`,
    `O Método ${mainKeyword} Passo a Passo`,
    `A Framework Exclusiva de ${mainKeyword}`,
    `O Protocolo ${mainKeyword} Comprovado`,
  ];
  
  const index = Math.floor(Math.random() * mechanisms.length);
  const selected = mechanisms[index];
  return selected || `O Sistema de 3 Fases Para ${mainKeyword}`;
}

function generateObjectionHandling(keywords: string[], domain: DomainKey | null): string[] {
  const objections = [
    "Não tenho tempo suficiente para implementar",
    "Não sei se isso vai funcionar para mim",
    "Já tentei outros métodos e não funcionaram",
    "O investimento parece alto",
    "Não tenho experiência prévia",
  ];
  
  const answers = [
    "O método foi desenhado para pessoas ocupadas. Dedique apenas 30 minutos por dia e veja resultados em semanas.",
    "Este sistema foi testado e validado por centenas de alunos em diferentes situações. Funciona se você aplicar.",
    "Diferente de outros métodos genéricos, este é específico e baseado em resultados reais de quem já aplicou.",
    "Pense no custo de não fazer nada. O valor do método é inferior ao que você perde sem aplicar essas estratégias.",
    "Não precisa de experiência. Começamos do zero e avançamos gradualmente, com suporte completo durante o processo.",
  ];
  
  // Return 3 random objection-answer pairs
  const selected = [];
  const indices = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5).slice(0, 3);
  for (const i of indices) {
    selected.push(`Objeção: ${objections[i]} - Resposta: ${answers[i]}`);
  }
  
  return selected;
}

function generateGuarantee(keywords: string[], domain: DomainKey | null): string {
  return "Garantia Incondicional de 30 Dias: Se você não estiver 100% satisfeito com os resultados, devolvemos todo o seu investimento. Sem perguntas, sem burocracia. O risco é todo nosso.";
}

function generateOfferStack(keywords: string[], domain: DomainKey | null): string[] {
  const stack = [
    "Módulo 1: Fundamentos Essenciais (R$ 497)",
    "Módulo 2: Estratégias Avançadas (R$ 697)",
    "Módulo 3: Implementação Prática (R$ 897)",
    "Bônus 1: Templates Prontos (R$ 297)",
    "Bônus 2: Comunidade Exclusiva (R$ 497)",
    "Bônus 3: Suporte VIP por 30 dias (R$ 997)",
    "Acesso Vitalício a Todas Atualizações (R$ 1.497)",
  ];
  
  return stack;
}
