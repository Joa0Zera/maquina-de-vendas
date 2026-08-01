export const COPY_PROMPTS = {
  GENERATE_COPY: (context: string) => `
Crie copy persuasiva para:

${context}

Gere:
1. Headline
2. Subheadline
3. 3 bullets
4. CTA
`,

  IMPROVE_COPY: (currentCopy: string) => `
Melhore esta copy para aumentar conversão:

${currentCopy}

Sugira:
1. Headline melhorada
2. Copy mais persuasiva
3. Gatilhos mentais adicionais
4. CTA mais forte
`,

  EMAIL_SEQUENCE: (product: string, audience: string) => `
Crie uma sequência de 5 emails para vender um infoproduto.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. Email 1: Apresentação
2. Email 2: Problema
3. Email 3: Solução
4. Email 4: Prova social
5. Email 5: Oferta final
`,

  SALES_PAGE: (product: string, audience: string, price: string) => `
Crie copy completa para página de vendas.

Produto: ${product}
Público-alvo: ${audience}
Preço: ${price}

Gere:
1. Headline
2. Subheadline
3. História
4. Problema
5. Solução
6. Benefícios
7. Prova social
8. Oferta
9. Garantia
10. CTA
`,
} as const;
