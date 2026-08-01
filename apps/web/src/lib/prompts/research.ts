export const RESEARCH_PROMPTS = {
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

  COMPETITOR_ANALYSIS: (competitors: string[]) => `
Analise os seguintes concorrentes:

${competitors.join("\n")}

Para cada concorrente, identifique:
1. Pontos fortes
2. Pontos fracos
3. Estratégias de marketing
4. Preços
5. Diferenciais
`,

  TREND_ANALYSIS: (industry: string) => `
Analise tendências atuais na indústria: ${industry}

Identifique:
1. Tendências emergentes
2. Tendências em declínio
3. Oportunidades de mercado
4. Mudanças no comportamento do consumidor
5. Tecnologias disruptivas
`,

  AUDIENCE_RESEARCH: (audience: string) => `
Pesquise o público-alvo: ${audience}

Identifique:
1. Demografia
2. Psicografia
3. Comportamentos
4. Dores e desejos
5. Canais preferidos
6. Linguagem e tom
`,
} as const;
