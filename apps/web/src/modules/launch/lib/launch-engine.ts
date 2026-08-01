import { db, copyAssets, intelligenceReports, offers, organicDistribution, products, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";

export interface LaunchScore {
  score: number;
  status: "EXCELLENT" | "VERY_GOOD" | "GOOD" | "REGULAR" | "POOR";
}

export interface LaunchProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface NextAction {
  title: string;
  description: string;
  action: string;
  href: string;
  estimatedMinutes: number;
  impact: "Muito Alto" | "Alto" | "Médio" | "Baixo";
  priority: number;
}

export class LaunchEngine {
  static async getScore(productId: string, organizationId: string): Promise<number> {
    const [product, offer, research, copy, organic, intelligence] = await Promise.all([
      db
        .select()
        .from(products)
        .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(offers)
        .where(and(eq(offers.productId, productId), eq(offers.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(trafficResearch)
        .where(and(eq(trafficResearch.productId, productId), eq(trafficResearch.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(copyAssets)
        .where(and(eq(copyAssets.productId, productId), eq(copyAssets.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(organicDistribution)
        .where(and(eq(organicDistribution.productId, productId), eq(organicDistribution.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(intelligenceReports)
        .where(and(eq(intelligenceReports.productId, productId), eq(intelligenceReports.organizationId, organizationId)))
        .limit(1),
    ]);

    const productData = product[0];
    const offerData = offer[0];
    const intelligenceData = intelligence[0];

    // If intelligence report exists, use its score
    if (intelligenceData && intelligenceData.score) {
      return intelligenceData.score;
    }

    // Calculate score based on completion
    let score = 0;

    // Product configured (20 points)
    if (productData && productData.status === "published") score += 20;
    else if (productData) score += 10;

    // Offer exists (20 points)
    if (offerData) score += 20;

    // Checkout configured (15 points)
    if (productData && productData.checkoutUrl) score += 15;

    // Traffic research (10 points)
    if (research && research.length > 0) score += 10;

    // Copy exists (15 points)
    if (copy && copy.length > 0) score += 15;

    // Organic distribution (10 points)
    if (organic && organic.length > 0) score += 10;

    // Intelligence (10 points)
    if (intelligence && intelligence.length > 0) score += 10;

    return score;
  }

  static getStatus(score: number): LaunchScore["status"] {
    if (score >= 91) return "EXCELLENT";
    if (score >= 76) return "VERY_GOOD";
    if (score >= 51) return "GOOD";
    if (score >= 26) return "REGULAR";
    return "POOR";
  }

  static async getNextAction(productId: string, organizationId: string): Promise<NextAction | null> {
    const [product, offer, research, copy, organic, intelligence] = await Promise.all([
      db
        .select()
        .from(products)
        .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(offers)
        .where(and(eq(offers.productId, productId), eq(offers.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(trafficResearch)
        .where(and(eq(trafficResearch.productId, productId), eq(trafficResearch.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(copyAssets)
        .where(and(eq(copyAssets.productId, productId), eq(copyAssets.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(organicDistribution)
        .where(and(eq(organicDistribution.productId, productId), eq(organicDistribution.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(intelligenceReports)
        .where(and(eq(intelligenceReports.productId, productId), eq(intelligenceReports.organizationId, organizationId)))
        .limit(1),
    ]);

    const productData = product[0];
    const offerData = offer[0];

    // Priority order: Produto → Oferta → Landing → Checkout → Distribuição → Inteligência → Concluído

    // 1. Check if product is configured
    if (!productData || productData.status === "draft") {
      return {
        title: "Configurar Produto",
        description: "Complete as configurações básicas do produto",
        action: "Configurar",
        href: `/products/${productId}/edit`,
        estimatedMinutes: 5,
        impact: "Muito Alto",
        priority: 1,
      };
    }

    // 2. Check if offer exists
    if (!offerData) {
      return {
        title: "Criar Oferta",
        description: "Gere a oferta de vendas para o produto",
        action: "Criar Oferta",
        href: "/product-factory",
        estimatedMinutes: 3,
        impact: "Muito Alto",
        priority: 2,
      };
    }

    // 3. Check if checkout is configured
    if (!productData.checkoutUrl) {
      return {
        title: "Registrar Checkout",
        description: "Configure a URL do checkout para começar a vender",
        action: "Configurar Checkout",
        href: `/products/${productId}/edit`,
        estimatedMinutes: 2,
        impact: "Muito Alto",
        priority: 3,
      };
    }

    // 4. Check if traffic research exists
    if (!research || research.length === 0) {
      return {
        title: "Gerar Pesquisa de Tráfego",
        description: "Analise o tráfego e oportunidades do mercado",
        action: "Gerar Pesquisa",
        href: `/products/${productId}`,
        estimatedMinutes: 5,
        impact: "Alto",
        priority: 4,
      };
    }

    // 5. Check if copy exists
    if (!copy || copy.length === 0) {
      return {
        title: "Gerar Copy",
        description: "Crie assets de copywriting para o produto",
        action: "Gerar Copy",
        href: `/products/${productId}`,
        estimatedMinutes: 3,
        impact: "Alto",
        priority: 5,
      };
    }

    // 6. Check if organic distribution exists
    if (!organic || organic.length === 0) {
      return {
        title: "Gerar Distribuição Orgânica",
        description: "Configure canais de distribuição orgânica",
        action: "Gerar Distribuição",
        href: `/products/${productId}`,
        estimatedMinutes: 3,
        impact: "Alto",
        priority: 6,
      };
    }

    // 7. Check if intelligence exists
    if (!intelligence || intelligence.length === 0) {
      return {
        title: "Gerar Inteligência",
        description: "Obtenha insights e recomendações do projeto",
        action: "Gerar Inteligência",
        href: `/products/${productId}`,
        estimatedMinutes: 5,
        impact: "Médio",
        priority: 7,
      };
    }

    // All complete
    return {
      title: "Projeto Completo",
      description: "Seu projeto está pronto para vender",
      action: "Ver Landing Page",
      href: `/p/${productData?.slug || productId}`,
      estimatedMinutes: 0,
      impact: "Baixo",
      priority: 8,
    };
  }

  static async getHealth(productId: string, organizationId: string): Promise<LaunchScore> {
    const score = await this.getScore(productId, organizationId);
    const status = this.getStatus(score);
    return { score, status };
  }

  static async getProgress(productId: string, organizationId: string): Promise<LaunchProgress> {
    const [product, offer, research, copy, organic, intelligence] = await Promise.all([
      db
        .select()
        .from(products)
        .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(offers)
        .where(and(eq(offers.productId, productId), eq(offers.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(trafficResearch)
        .where(and(eq(trafficResearch.productId, productId), eq(trafficResearch.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(copyAssets)
        .where(and(eq(copyAssets.productId, productId), eq(copyAssets.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(organicDistribution)
        .where(and(eq(organicDistribution.productId, productId), eq(organicDistribution.organizationId, organizationId)))
        .limit(1),
      db
        .select()
        .from(intelligenceReports)
        .where(and(eq(intelligenceReports.productId, productId), eq(intelligenceReports.organizationId, organizationId)))
        .limit(1),
    ]);

    const productData = product[0];
    const offerData = offer[0];

    let completed = 0;
    const total = 7;

    // Product configured
    if (productData && productData.status === "published") completed += 1;

    // Offer exists
    if (offerData) completed += 1;

    // Checkout configured
    if (productData && productData.checkoutUrl) completed += 1;

    // Traffic research
    if (research && research.length > 0) completed += 1;

    // Copy exists
    if (copy && copy.length > 0) completed += 1;

    // Organic distribution
    if (organic && organic.length > 0) completed += 1;

    // Intelligence
    if (intelligence && intelligence.length > 0) completed += 1;

    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  }

  static getCommercialStatus(score: number): string {
    if (score >= 91) return "Pronto para vender";
    if (score >= 76) return "Quase pronto";
    if (score >= 51) return "Em desenvolvimento";
    if (score >= 26) return "Iniciado";
    return "Rascunho";
  }
}
