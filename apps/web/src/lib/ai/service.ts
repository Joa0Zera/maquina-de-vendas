import { aiProvider } from "./provider";
import { AIOptions, AIContext } from "./types";

class AIService {
  /**
   * Generate text with a simple prompt
   */
  async generateText(prompt: string, options?: AIOptions): Promise<string> {
    return aiProvider.generate(prompt, options);
  }

  /**
   * Generate marketing copy
   */
  async generateMarketingCopy(
    product: string,
    audience: string,
    price: string,
    options?: AIOptions
  ): Promise<string> {
    const prompt = `
Crie copy persuasiva para um infoproduto.

Produto: ${product}
Público-alvo: ${audience}
Preço: ${price}

Gere:
1. Headline principal
2. Subheadline
3. 5 bullets principais
4. Garantia
5. Call to action
`;
    return aiProvider.generate(prompt, options);
  }

  /**
   * Generate headline
   */
  async generateHeadline(topic: string, audience: string, options?: AIOptions): Promise<string> {
    const prompt = `
Crie 10 headlines poderosos para um infoproduto.

Tópico: ${topic}
Público-alvo: ${audience}

Gere headlines que:
- Sejam curtos e impactantes
- Usem gatilhos mentais
- Prometam benefícios claros
- Sejam orientados para ação
`;
    return aiProvider.generate(prompt, options);
  }

  /**
   * Generate offer
   */
  async generateOffer(
    product: string,
    audience: string,
    price: string,
    options?: AIOptions
  ): Promise<string> {
    const prompt = `
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
`;
    return aiProvider.generate(prompt, options);
  }

  /**
   * Generate market research
   */
  async generateResearch(topic: string, options?: AIOptions): Promise<string> {
    const prompt = `
Realize uma pesquisa de mercado sobre: ${topic}

Analise:
1. Tamanho do mercado
2. Tendências atuais
3. Concorrência
4. Oportunidades
5. Dores e desejos do público
6. Canais de distribuição
7. Preços praticados
`;
    return aiProvider.generate(prompt, options);
  }

  /**
   * Generate landing page structure
   */
  async generateLanding(
    product: string,
    audience: string,
    options?: AIOptions
  ): Promise<string> {
    const prompt = `
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
`;
    return aiProvider.generate(prompt, options);
  }

  /**
   * Generate ads
   */
  async generateAds(
    product: string,
    audience: string,
    platform: string,
    options?: AIOptions
  ): Promise<string> {
    const prompt = `
Crie anúncios para ${platform}.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. 5 headlines
2. 5 textos de anúncio
3. 5 CTAs
4. Sugestões de criativo
5. Segmentação sugerida
`;
    return aiProvider.generate(prompt, options);
  }

  /**
   * Generate objections handling
   */
  async generateObjections(
    product: string,
    audience: string,
    options?: AIOptions
  ): Promise<string> {
    const prompt = `
Identifique e responda às principais objeções para um infoproduto.

Produto: ${product}
Público-alvo: ${audience}

Gere:
1. Lista das 10 principais objeções
2. Respostas persuasivas para cada objeção
3. Provas e garantias para reforçar as respostas
`;
    return aiProvider.generate(prompt, options);
  }

  /**
   * Chat with context
   */
  async chat(
    message: string,
    context?: AIContext,
    options?: AIOptions
  ): Promise<string> {
    let prompt = message;

    if (context) {
      const contextInfo = [];

      if (context.product) {
        contextInfo.push(
          `Produto: ${context.product.name} (${context.product.description}) - R$ ${context.product.price}`
        );
      }

      if (context.offer) {
        contextInfo.push(`Oferta: ${context.offer.name} - R$ ${context.offer.price}`);
      }

      if (context.landing) {
        contextInfo.push(`Landing Page: ${context.landing.url}`);
      }

      if (context.checkout) {
        contextInfo.push(`Checkout: ${context.checkout.url}`);
      }

      if (context.research) {
        contextInfo.push(`Pesquisa: ${context.research.topic}`);
      }

      if (contextInfo.length > 0) {
        prompt = `
Contexto do projeto:
${contextInfo.join("\n")}

Pergunta: ${message}
`;
      }
    }

    return aiProvider.generate(prompt, options);
  }
}

// Singleton instance
export const aiService = new AIService();
