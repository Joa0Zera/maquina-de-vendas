import { Offer } from "@maquina/database";

export interface LandingPageSections {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  problem: {
    painPoints: string[];
  };
  solution: {
    explanation: string;
  };
  benefits: {
    benefits: string[];
  };
  offer: {
    presentation: string;
    uniqueMechanism: string;
    offerStack: string[];
    guarantee: string;
  };
  objectionHandling: {
    objections: string[];
  };
  faq: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    finalCallToAction: string;
  };
}

// Domain-specific landing templates
const DOMAIN_LANDING_TEMPLATES = {
  ai: {
    hero: [
      {
        headline: "Automatize o trabalho repetitivo com IA",
        subheadline: "Um método direto para aplicar inteligência artificial no seu dia a dia profissional",
        cta: "Ver o método",
      },
      {
        headline: "IA aplicada ao trabalho real",
        subheadline: "Ferramentas e processos práticos para reduzir o tempo gasto em tarefas operacionais",
        cta: "Começar agora",
      },
    ],
    painPoints: [
      [
        "Tarefas repetitivas consomem horas que poderiam ir para trabalho estratégico",
        "É difícil acompanhar o ritmo de novas ferramentas de IA",
        "Falta clareza sobre quais ferramentas realmente valem o tempo de aprender",
      ],
      [
        "Sobrecarga de tarefas manuais limita o foco em prioridades",
        "Processos manuais tomam tempo que poderia ir para os clientes",
        "Manter consistência na produção de conteúdo é trabalhoso",
      ],
    ],
    benefits: [
      [
        "Automatize tarefas repetitivas",
        "Reduza o tempo de entrega dos seus projetos",
        "Diminua o volume de trabalho operacional",
        "Produza conteúdo com mais agilidade",
        "Direcione mais tempo para decisões estratégicas",
      ],
      [
        "Aprenda as ferramentas mais usadas no mercado",
        "Siga um processo estruturado, sem enrolação",
        "Acesse suporte para dúvidas de implementação",
        "Acompanhe atualizações sobre novas ferramentas",
        "Aplique métodos já validados por outros profissionais",
      ],
    ],
    faq: [
      [
        {
          question: "Preciso saber programar para usar as ferramentas de IA?",
          answer: "Não. O conteúdo cobre o uso prático das ferramentas, do básico ao avançado, sem exigir conhecimento técnico prévio.",
        },
        {
          question: "Quanto tempo leva para ver resultados?",
          answer: "A maioria consegue automatizar as primeiras tarefas já na primeira semana de aplicação.",
        },
        {
          question: "As ferramentas ensinadas são pagas?",
          answer: "O material cobre opções gratuitas e pagas, com foco em custo-benefício para diferentes orçamentos.",
        },
        {
          question: "Serve para a minha área de atuação?",
          answer: "Sim. Os exemplos cobrem design, redação, programação, marketing e administração.",
        },
        {
          question: "Tenho suporte se tiver dúvidas?",
          answer: "Sim, há canal de suporte dedicado para dúvidas de implementação.",
        },
      ],
    ],
    cta: [
      "Comece a aplicar IA no seu trabalho hoje.",
      "O método está disponível — o próximo passo é seu.",
    ],
  },
  marketing: {
    hero: [
      {
        headline: "Funis de vendas que convertem",
        subheadline: "Um sistema estruturado para gerar leads qualificados e escalar vendas com previsibilidade",
        cta: "Ver o método",
      },
      {
        headline: "Marketing digital com resultado mensurável",
        subheadline: "Estratégias práticas para gerar resultados previsíveis e escaláveis",
        cta: "Começar agora",
      },
    ],
    painPoints: [
      [
        "Custo de aquisição de cliente acima do sustentável",
        "Dificuldade em escalar campanhas com consistência",
        "Falta de um sistema previsível para gerar leads",
      ],
      [
        "Investimento em marketing sem retorno claro",
        "Falta de clareza sobre como otimizar funis de vendas",
        "Mudanças de algoritmo afetando os resultados",
      ],
    ],
    benefits: [
      [
        "Reduza o custo de aquisição de clientes",
        "Mantenha um fluxo constante de leads qualificados",
        "Planeje crescimento de receita com mais previsibilidade",
        "Avalie o retorno de cada campanha com clareza",
        "Aplique um sistema replicável, independente do porte do negócio",
      ],
      [
        "Aprenda estratégias já validadas no mercado",
        "Domine as principais plataformas de anúncios",
        "Construa funis de vendas automatizados",
        "Acesse uma comunidade de marketing digital",
        "Acompanhe atualizações sobre o mercado",
      ],
    ],
    faq: [
      [
        {
          question: "Serve para negócios pequenos?",
          answer: "Sim. O método é adaptável a diferentes portes de negócio, com estratégias que funcionam mesmo com orçamento limitado.",
        },
        {
          question: "Preciso de experiência prévia?",
          answer: "Não. O conteúdo começa do zero e avança até estratégias mais avançadas.",
        },
        {
          question: "Quanto preciso investir em anúncios?",
          answer: "O material ensina a otimizar qualquer orçamento, começando com testes pequenos antes de escalar.",
        },
        {
          question: "Funciona para e-commerce?",
          answer: "Sim, há módulos específicos para e-commerce, lojas físicas, serviços e infoprodutos.",
        },
        {
          question: "Tenho suporte durante a implementação?",
          answer: "Sim, há suporte e comunidade disponíveis ao longo do processo.",
        },
      ],
    ],
    cta: [
      "Comece a estruturar um marketing com resultado mensurável.",
      "O sistema está pronto para ser aplicado no seu negócio.",
    ],
  },
  freelancers: {
    hero: [
      {
        headline: "Renda mais estável como freelancer",
        subheadline: "Um método para construir carteira de clientes recorrentes e cobrar preços justos pelo seu trabalho",
        cta: "Ver o método",
      },
      {
        headline: "Freelancer: de instável para previsível",
        subheadline: "Transforme suas habilidades em um negócio sustentável",
        cta: "Começar agora",
      },
    ],
    painPoints: [
      [
        "Renda instável de um mês para o outro",
        "Dificuldade em conseguir clientes com bom orçamento",
        "Preços baixos por conta da concorrência",
      ],
      [
        "Falta de um sistema para escalar os serviços",
        "Dependência de plataformas como Upwork e Fiverr",
        "Dificuldade em comunicar o valor do próprio trabalho",
      ],
    ],
    benefits: [
      [
        "Construa uma renda mensal mais previsível",
        "Desenvolva uma carteira de clientes recorrentes",
        "Cobre preços condizentes com o valor entregue",
        "Estruture um negócio que não dependa só de horas trabalhadas",
        "Reduza a dependência de plataformas terceiras",
      ],
      [
        "Aprenda a criar propostas mais eficazes",
        "Domine o posicionamento de preço",
        "Estruture um processo de fidelização de clientes",
        "Acesse uma comunidade de freelancers",
        "Aprenda estratégias para captar clientes diretos",
      ],
    ],
    faq: [
      [
        {
          question: "Serve para qualquer área de freelancer?",
          answer: "Sim, o método se aplica a designers, desenvolvedores, redatores, consultores e outros prestadores de serviço.",
        },
        {
          question: "Quanto tempo leva para ver resultados?",
          answer: "A maioria relata clientes melhores já nas primeiras semanas, com renda mais estável em alguns meses.",
        },
        {
          question: "Preciso ter portfólio pronto?",
          answer: "Não é obrigatório. O material ensina a criar e otimizar um portfólio do zero ou a partir do que você já tem.",
        },
        {
          question: "Como sair de plataformas como Upwork?",
          answer: "O conteúdo cobre estratégias para atrair clientes diretos e construir autoridade fora dessas plataformas.",
        },
        {
          question: "Tenho suporte durante o processo?",
          answer: "Sim, há suporte e comunidade disponíveis para cada etapa.",
        },
      ],
    ],
    cta: [
      "Comece a estruturar um negócio de freelancer mais estável.",
      "O método está disponível para você aplicar hoje.",
    ],
  },
  productivity: {
    hero: [
      {
        headline: "Mais foco, menos desperdício de tempo",
        subheadline: "Um sistema prático para eliminar distrações e priorizar o que realmente importa",
        cta: "Ver o método",
      },
      {
        headline: "Produtividade sem depender de motivação",
        subheadline: "Reduza a procrastinação e avance nos seus objetivos com menos esforço",
        cta: "Começar agora",
      },
    ],
    painPoints: [
      [
        "Procrastinação constante e dificuldade de foco",
        "Excesso de tarefas e pouco tempo disponível",
        "Sensação recorrente de não dar conta de tudo",
      ],
      [
        "Sobrecarga por excesso de trabalho",
        "Distrações constantes atrapalhando o progresso",
        "Dificuldade em priorizar o que é realmente importante",
      ],
    ],
    benefits: [
      [
        "Reduza o tempo gasto em tarefas do dia a dia",
        "Ganhe clareza sobre o que priorizar",
        "Tenha mais controle sobre a própria agenda",
        "Equilibre melhor trabalho e vida pessoal",
        "Adote um sistema sustentável, não um esforço pontual",
      ],
      [
        "Aprenda técnicas de gestão de tempo",
        "Domine um método de priorização simples",
        "Reduza distrações de forma consistente",
        "Estruture rotinas que sustentem o foco",
        "Acesse uma comunidade voltada a produtividade",
      ],
    ],
    faq: [
      [
        {
          question: "Funciona para quem tem pouco tempo?",
          answer: "Sim, o método foi desenhado para pessoas com agenda cheia, otimizando o tempo que você já tem.",
        },
        {
          question: "Preciso de disciplina para aplicar?",
          answer: "Não. O sistema funciona mesmo em dias de baixa motivação — a consistência vem do processo, não da força de vontade.",
        },
        {
          question: "Serve para estudantes?",
          answer: "Sim, o método se aplica a estudantes, profissionais e empreendedores.",
        },
        {
          question: "Quanto tempo leva para ver resultados?",
          answer: "Muitos relatam melhorias já na primeira semana de aplicação.",
        },
        {
          question: "Tenho suporte durante a implementação?",
          answer: "Sim, há suporte e comunidade disponíveis para manter a consistência.",
        },
      ],
    ],
    cta: [
      "Comece a organizar seu tempo com mais clareza.",
      "O sistema está pronto para você aplicar hoje.",
    ],
  },
};

type DomainKey = keyof typeof DOMAIN_LANDING_TEMPLATES;

/**
 * Generate landing page sections from an offer using deterministic templates.
 * This is a placeholder for future AI integration.
 */
export function generateLandingPageFromOffer(offer: Offer): LandingPageSections {
  const copy = offer.copy as {
    targetAudience?: string;
    problem?: string;
    desiredOutcome?: string;
    trendTitle?: string;
    subheadline?: string;
    bigPromise?: string;
    uniqueMechanism?: string;
    objectionHandling?: string[];
    guarantee?: string;
    offerStack?: string[];
  } || {};

  const productName = offer.name;
  const headline = offer.headline || productName;
  const subheadline = copy.subheadline || "";
  const targetAudience = copy.targetAudience || "profissionais";
  const problem = copy.problem || "desafios comuns";
  const desiredOutcome = copy.desiredOutcome || "resultados melhores";
  const trendTitle = copy.trendTitle || "";
  const uniqueMechanism = copy.uniqueMechanism || "";
  const objectionHandling = copy.objectionHandling || [];
  const guarantee = copy.guarantee || "";
  const offerStack = copy.offerStack || [];

  // Detect domain from trend title
  const domain = detectDomain(trendTitle.toLowerCase());

  return {
    hero: generateHeroSection(productName, headline, desiredOutcome, domain),
    problem: generateProblemSection(problem, domain),
    solution: generateSolutionSection(productName, targetAudience, domain),
    benefits: generateBenefitsSection(desiredOutcome, domain),
    offer: generateOfferSection(productName, headline, domain, uniqueMechanism, offerStack, guarantee),
    objectionHandling: generateObjectionHandlingSection(objectionHandling, domain),
    faq: generateFAQSection(productName, domain),
    cta: generateCTASection(productName, desiredOutcome, domain),
  };
}

function detectDomain(title: string): DomainKey | null {
  if (title.includes("ia") || title.includes("inteligência") || title.includes("ai") || title.includes("automation")) {
    return "ai";
  }
  if (title.includes("marketing") || title.includes("vendas") || title.includes("crescimento")) {
    return "marketing";
  }
  if (title.includes("freelancer") || title.includes("freela") || title.includes("autônomo")) {
    return "freelancers";
  }
  if (title.includes("produtividade") || title.includes("tempo") || title.includes("foco")) {
    return "productivity";
  }
  return null;
}

function generateHeroSection(productName: string, headline: string, desiredOutcome: string, domain: DomainKey | null): LandingPageSections["hero"] {
  if (domain && DOMAIN_LANDING_TEMPLATES[domain]) {
    const templates = DOMAIN_LANDING_TEMPLATES[domain].hero;
    const index = Math.floor(Math.random() * templates.length);
    return templates[index] as LandingPageSections["hero"];
  }

  const templates = [
    {
      headline: headline,
      subheadline: `Um método prático para ${desiredOutcome.toLowerCase()} com ${productName}`,
      cta: "Ver o método",
    },
    {
      headline: headline,
      subheadline: `Um caminho estruturado para ${desiredOutcome.toLowerCase()}`,
      cta: "Saiba mais",
    },
    {
      headline: headline,
      subheadline: `Aplique ${productName} no seu dia a dia`,
      cta: "Começar agora",
    },
  ];

  const index = Math.floor(Math.random() * templates.length);
  return templates[index] as LandingPageSections["hero"];
}

function generateProblemSection(problem: string, domain: DomainKey | null): LandingPageSections["problem"] {
  if (domain && DOMAIN_LANDING_TEMPLATES[domain]) {
    const templates = DOMAIN_LANDING_TEMPLATES[domain].painPoints;
    const index = Math.floor(Math.random() * templates.length);
    return {
      painPoints: templates[index] as string[],
    };
  }

  const painPointsTemplates = [
    [
      `${problem.charAt(0).toUpperCase() + problem.slice(1)} continua sem uma solução clara?`,
      "Tempo e recursos investidos sem o retorno esperado?",
      "Falta um ponto de partida definido para mudar isso?",
    ],
    [
      `${problem.charAt(0).toUpperCase() + problem.slice(1)} afeta os resultados diariamente`,
      "A falta de um sistema claro trava o progresso",
      "Uma abordagem estruturada faz diferença aqui",
    ],
    [
      `${problem.charAt(0).toUpperCase() + problem.slice(1)} é um obstáculo recorrente`,
      "Várias tentativas, poucos resultados consistentes",
      "Falta um método testado para seguir",
    ],
  ];

  const index = Math.floor(Math.random() * painPointsTemplates.length);
  return {
    painPoints: painPointsTemplates[index] as string[],
  };
}

function generateSolutionSection(productName: string, targetAudience: string, domain: DomainKey | null): LandingPageSections["solution"] {
  const templates = [
    `${productName} foi desenvolvido para ${targetAudience.toLowerCase()} que buscam resultados concretos. A metodologia combina práticas de mercado com um processo direto, sem enrolação.`,
    `${productName} oferece um sistema estruturado, pensado para as necessidades reais de ${targetAudience.toLowerCase()}, com passos claros e aplicáveis.`,
    `${productName} reúne um processo testado para ${targetAudience.toLowerCase()}, com foco em reduzir a complexidade e acelerar resultados.`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  return {
    explanation: templates[index] as string,
  };
}

function generateBenefitsSection(desiredOutcome: string, domain: DomainKey | null): LandingPageSections["benefits"] {
  if (domain && DOMAIN_LANDING_TEMPLATES[domain]) {
    const templates = DOMAIN_LANDING_TEMPLATES[domain].benefits;
    const index = Math.floor(Math.random() * templates.length);
    return {
      benefits: templates[index] as string[],
    };
  }

  const benefitsTemplates = [
    [
      `Avance em direção a ${desiredOutcome.toLowerCase()} com um processo estruturado`,
      "Metodologia passo a passo, fácil de seguir",
      "Suporte disponível ao longo da jornada",
      "Resultados já validados por outros usuários",
      "Garantia de satisfação",
    ],
    [
      `Progresso real rumo a ${desiredOutcome.toLowerCase()}`,
      "Ferramentas práticas para aplicar de imediato",
      "Acesso a uma comunidade de apoio",
      "Conteúdo atualizado periodicamente",
      "Acesso vitalício ao material",
    ],
    [
      `Um caminho claro para ${desiredOutcome.toLowerCase()}`,
      "Menos tentativa e erro",
      "Economia de tempo e recursos",
      "Processo replicável e escalável",
      "Mais segurança em cada etapa",
    ],
  ];

  const index = Math.floor(Math.random() * benefitsTemplates.length);
  return {
    benefits: benefitsTemplates[index] as string[],
  };
}

function generateOfferSection(productName: string, headline: string, domain: DomainKey | null, uniqueMechanism: string, offerStack: string[], guarantee: string): LandingPageSections["offer"] {
  const templates = [
    `${productName} reúne o que você precisa para avançar de forma estruturada. Com ${headline}, o processo fica claro e aplicável desde o primeiro dia.`,
    `Ao adquirir ${productName}, você tem acesso imediato ao conteúdo, ferramentas e recursos necessários. ${headline} é o ponto de partida.`,
    `${productName} foi pensado para dar clareza e direção ao processo. ${headline} torna os resultados mensuráveis desde o início.`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  return {
    presentation: templates[index] as string,
    uniqueMechanism: uniqueMechanism || "O método completo",
    offerStack: offerStack.length > 0 ? offerStack : ["Módulo principal", "Material de apoio", "Suporte direto"],
    guarantee: guarantee || "Garantia de 30 dias",
  };
}

function generateFAQSection(productName: string, domain: DomainKey | null): LandingPageSections["faq"] {
  if (domain && DOMAIN_LANDING_TEMPLATES[domain]) {
    const templates = DOMAIN_LANDING_TEMPLATES[domain].faq;
    const index = Math.floor(Math.random() * templates.length);
    return {
      questions: templates[index] as Array<{ question: string; answer: string }>,
    };
  }

  const questionsTemplates = [
    [
      {
        question: `${productName} é para mim?`,
        answer: `${productName} foi desenvolvido para quem busca resultados concretos. Não exige experiência prévia, apenas disposição para aplicar o método.`,
      },
      {
        question: "Quanto tempo leva para ver resultados?",
        answer: "Varia de pessoa para pessoa, mas a maioria relata melhorias já nas primeiras semanas de aplicação.",
      },
      {
        question: "Tenho suporte durante o processo?",
        answer: "Sim, há suporte disponível através de canais dedicados.",
      },
      {
        question: "Existe garantia?",
        answer: "Sim, garantia de satisfação — se não fizer sentido para você, o valor é devolvido.",
      },
      {
        question: "Como acesso o conteúdo?",
        answer: "Após a confirmação do pagamento, o acesso é liberado automaticamente.",
      },
    ],
    [
      {
        question: `Preciso de conhecimento prévio para usar ${productName}?`,
        answer: `Não. ${productName} foi pensado para ser acessível a diferentes níveis, começando do básico.`,
      },
      {
        question: "O conteúdo é atualizado?",
        answer: "Sim, o material é atualizado periodicamente.",
      },
      {
        question: "Posso acessar de qualquer dispositivo?",
        answer: "Sim, o acesso funciona em computador, tablet e celular.",
      },
      {
        question: "O pagamento é seguro?",
        answer: "Sim, o checkout é processado por um gateway de pagamento com criptografia padrão de mercado.",
      },
      {
        question: "E se eu tiver dúvidas durante o processo?",
        answer: "Você tem acesso a suporte dedicado para tirar dúvidas.",
      },
    ],
  ];

  const index = Math.floor(Math.random() * questionsTemplates.length);
  return {
    questions: questionsTemplates[index] as Array<{ question: string; answer: string }>,
  };
}

function generateCTASection(productName: string, desiredOutcome: string, domain: DomainKey | null): LandingPageSections["cta"] {
  if (domain && DOMAIN_LANDING_TEMPLATES[domain]) {
    const templates = DOMAIN_LANDING_TEMPLATES[domain].cta;
    const index = Math.floor(Math.random() * templates.length);
    return {
      finalCallToAction: templates[index] as string,
    };
  }

  const templates = [
    `Comece agora a aplicar ${productName} rumo a ${desiredOutcome.toLowerCase()}.`,
    `O conteúdo de ${productName} está pronto para você aplicar hoje.`,
    `${productName} está disponível — o próximo passo é seu.`,
  ];

  const index = Math.floor(Math.random() * templates.length);
  return {
    finalCallToAction: templates[index] as string,
  };
}

function generateObjectionHandlingSection(objectionHandling: string[], domain: DomainKey | null): LandingPageSections["objectionHandling"] {
  if (objectionHandling && objectionHandling.length > 0) {
    return {
      objections: objectionHandling,
    };
  }

  // Fallback objection handling
  const fallbackObjections = [
    "Não tenho tempo suficiente para implementar - O método foi pensado para rotinas ocupadas, com passos de poucos minutos por dia.",
    "Não sei se vai funcionar para mim - O processo já foi validado em diferentes contextos e situações.",
    "O investimento parece alto - Vale comparar com o custo de manter o problema sem solução.",
  ];

  return {
    objections: fallbackObjections,
  };
}
