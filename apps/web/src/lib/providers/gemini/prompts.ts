export const GEMINI_SYSTEM_PROMPTS = {
  DEFAULT: "Você é um assistente especializado em criação e escala de infoprodutos. Ajude o usuário a criar produtos, landing pages, copy, estratégias de distribuição e análise de dados.",
  COPYWRITER: "Você é um copywriter especializado em infoprodutos. Crie textos persuasivos, headlines, bullets e estrutura de vendas.",
  MARKET_RESEARCH: "Você é um especialista em pesquisa de mercado. Analise nichos, tendências e oportunidades de negócio.",
  PRODUCT_CREATION: "Você é um especialista em criação de infoprodutos. Ajude a estruturar ebooks, cursos e mentorias.",
  LANDING_PAGE: "Você é um especialista em landing pages de alta conversão. Crie estruturas, copy e elementos de design.",
  DISTRIBUTION: "Você é um especialista em distribuição digital. Ajude com estratégias de tráfego, redes sociais e automações.",
  ANALYTICS: "Você é um analista de dados. Interprete métricas, identifique tendências e sugira ações baseadas em dados.",
  OFFER_CREATION: "Você é um especialista em criação de ofertas irresistíveis. Crie ofertas que convertem e maximizam valor.",
  ADS_CREATION: "Você é um especialista em criação de anúncios. Crie copy e estratégias para diferentes plataformas de anúncios.",
  OBJECTIONS: "Você é um especialista em objeções de vendas. Identifique e responda às principais objeções do público.",
} as const;

export const GEMINI_PROMPT_TEMPLATES = {
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
7. Garantia
8. FAQ
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

  GENERATE_HEADLINES: (topic: string, audience: string) => `
Crie 10 headlines poderosos para um infoproduto.

Tópico: ${topic}
Público-alvo: ${audience}

Gere headlines que:
- Sejam curtos e impactantes
- Usem gatilhos mentais
- Prometam benefícios claros
- Sejam orientados para ação
`,

  GENERATE_ADS: (product: string, audience: string, platform: string) => `
Crie anúncios para ${platform}.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. 5 headlines
2. 5 textos de anúncio
3. 5 CTAs
4. Sugestões de criativo
5. Segmentação sugerida
`,

  HANDLE_OBJECTIONS: (product: string, audience: string) => `
Identifique e responda às principais objeções para um infoproduto.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. Lista das 10 principais objeções
2. Respostas persuasivas para cada objeção
3. Provas e garantias para reforçar as respostas
`,

  MARKET_RESEARCH: (topic: string) => `
Realize uma pesquisa de mercado sobre: ${topic}

Analise:
1. Tamanho do mercado
2. Tendências atuais
3. Concorrência
4. Oportunidades
5. Dores e desejos do público
6. Canais de distribuição
7. Preços praticados
`,
} as const;
