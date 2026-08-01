export const OFFER_PROMPTS = {
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

  PRICING_STRATEGY: (product: string, market: string) => `
Desenvolva estratégia de preços.

Produto: ${product}
Mercado: ${market}

Analise:
1. Preço ideal
2. Estrutura de preços
3. Descontos e promoções
4. Upsell e downsell
5. Anchor pricing
`,

  BUNDLE_OFFER: (products: string[]) => `
Crie oferta de bundle.

Produtos:
${products.join("\n")}

Gere:
1. Nome do bundle
2. Preço do bundle
3. Economia para o cliente
4. Benefícios do bundle
5. CTA
`,

  SCARCITY_OFFER: (product: string, limit: number) => `
Crie oferta com escassez.

Produto: ${product}
Limite: ${limit}

Gere:
1. Headline com urgência
2. Contador regressivo
3. Motivo da escassez
4. CTA de ação imediata
`,
} as const;
