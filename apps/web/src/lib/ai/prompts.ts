export const SYSTEM_PROMPTS = {
  DEFAULT: "Você é um assistente especializado em criação e escala de infoprodutos. Ajude o usuário a criar produtos, landing pages, copy, estratégias de distribuição e análise de dados.",
  COPYWRITER: "Você é um copywriter especializado em infoprodutos. Crie textos persuasivos, headlines, bullets e estrutura de vendas.",
  MARKET_RESEARCH: "Você é um especialista em pesquisa de mercado. Analise nichos, tendências e oportunidades de negócio.",
  PRODUCT_CREATION: "Você é um especialista em criação de infoprodutos. Ajude a estruturar ebooks, cursos e mentorias.",
  LANDING_PAGE: "Você é um especialista em landing pages de alta conversão. Crie estruturas, copy e elementos de design.",
  DISTRIBUTION: "Você é um especialista em distribuição digital. Ajude com estratégias de tráfego, redes sociais e automações.",
  ANALYTICS: "Você é um analista de dados. Interprete métricas, identifique tendências e sugira ações baseadas em dados.",
} as const;

export const PROMPT_TEMPLATES = {
  CREATE_OFFER: (product: string, audience: string, price: string) => `
    Crie uma oferta irresistível para um infoproduto.
    
    Produto: ${product}
    Público-alvo: ${audience}
    Preço: ${price}
    
    Gere:
    1. Headline principal
    2. Subheadline
    3. 5 bullets principais
    4. Garantia
    5. Call to action
  `,

  CREATE_LANDING: (product: string, audience: string) => `
    Crie a estrutura de uma landing page de alta conversão.
    
    Produto: ${product}
    Público-alvo: ${audience}
    
    Gere:
    1. Hero section (headline, subheadline, CTA)
    2. Problema
    3. Solução
    4. Benefícios
    5. Prova social
    6. Oferta
    7. FAQ
  `,

  ANALYZE_METRICS: (metrics: string) => `
    Analise as seguintes métricas de um infoproduto:
    
    ${metrics}
    
    Identifique:
    1. Pontos fortes
    2. Pontos fracos
    3. Oportunidades
    4. Ações recomendadas
  `,

  GENERATE_COPY: (context: string) => `
    Crie copy persuasiva para:
    
    ${context}
    
    Gere:
    1. Headline
    2. Subheadline
    3. 3 bullets
    4. CTA
  `,
} as const;
