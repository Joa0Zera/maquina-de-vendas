export const ADS_PROMPTS = {
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

  FACEBOOK_ADS: (product: string, audience: string) => `
Crie anúncios para Facebook Ads.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. 5 headlines
2. 5 textos primários
3. 5 textos secundários
4. Sugestões de criativo
5. Segmentação detalhada
`,

  GOOGLE_ADS: (product: string, keywords: string[]) => `
Crie anúncios para Google Ads.

Produto: ${product}
Palavras-chave: ${keywords.join(", ")}

Gere:
1. 5 headlines (30 caracteres)
2. 5 descrições (90 caracteres)
3. Extensões de anúncio
4. Estratégia de lances
`,

  INSTAGRAM_ADS: (product: string, audience: string) => `
Crie anúncios para Instagram.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. 5 captions
2. 5 hashtags
3. Sugestões de stories
4. Sugestões de reels
5. Estratégia de influenciadores
`,
} as const;
