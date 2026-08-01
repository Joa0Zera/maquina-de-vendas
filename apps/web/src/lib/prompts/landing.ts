export const LANDING_PROMPTS = {
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
9. CTA final
`,

  HERO_SECTION: (product: string, audience: string) => `
Crie hero section para landing page.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. Headline principal
2. Subheadline
3. CTA principal
4. CTA secundário
5. Elemento visual sugerido
`,

  TESTIMONIALS: (product: string) => `
Crie depoimentos para landing page.

Produto: ${product}

Gere:
1. 5 depoimentos variados
2. Nomes e cargos fictícios
3. Resultados específicos
4. Antes e depois
`,

  FAQ_SECTION: (product: string, audience: string) => `
Crie seção de FAQ para landing page.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. 10 perguntas frequentes
2. Respostas claras e objetivas
3. Objeções abordadas
`,
} as const;
