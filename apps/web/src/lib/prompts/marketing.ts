export const MARKETING_PROMPTS = {
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
6. Bônus (se aplicável)
7. Escassez/urgência
`,

  CREATE_HEADLINE: (topic: string, audience: string) => `
Crie 10 headlines poderosos para um infoproduto.

Tópico: ${topic}
Público-alvo: ${audience}

Gere headlines que:
- Sejam curtos e impactantes
- Usem gatilhos mentais
- Prometam benefícios claros
- Sejam orientados para ação
`,

  VALUE_PROPOSITION: (product: string, audience: string) => `
Crie uma proposta de valor única para um infoproduto.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. Proposta de valor principal
2. 3 benefícios únicos
3. Diferenciais competitivos
4. Por que escolher este produto
`,
} as const;
