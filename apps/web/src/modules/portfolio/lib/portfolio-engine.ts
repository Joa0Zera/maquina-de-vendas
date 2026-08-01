import { db, copyAssets, intelligenceReports, offers, organicDistribution, products, trafficResearch } from "@maquina/database";
import { and, eq, desc } from "drizzle-orm";
import { LaunchEngine } from "@/modules/launch/lib/launch-engine";
import type { 
  ProjectRanking, 
  PortfolioHealth, 
  DailyTask, 
  PortfolioInsights, 
  NichoDistribution, 
  TimelineEvent 
} from "@/modules/portfolio/types/portfolio";

export class PortfolioEngine {
  static async getProjectsRanking(organizationId: string): Promise<ProjectRanking[]> {
    const allProducts = await db
      .select()
      .from(products)
      .where(eq(products.organizationId, organizationId));

    if (!allProducts || allProducts.length === 0) {
      return [];
    }

    const rankings: ProjectRanking[] = [];

    for (const product of allProducts) {
      if (!product) continue;

      const score = await LaunchEngine.getScore(product.id, organizationId);
      const status = LaunchEngine.getStatus(score);
      const nextAction = await LaunchEngine.getNextAction(product.id, organizationId);

      let projectStatus: "ready" | "building" | "paused";
      if (score >= 91) projectStatus = "ready";
      else if (score >= 26) projectStatus = "building";
      else projectStatus = "paused";

      let priority: "ALTA" | "MÉDIA" | "BAIXA";
      if (score >= 76 && !product.checkoutUrl) priority = "ALTA";
      else if (score >= 51) priority = "MÉDIA";
      else priority = "BAIXA";

      rankings.push({
        position: 0, // Will be updated after sorting
        projectId: product.id,
        productName: product.title,
        score,
        status: projectStatus,
        nextAction: nextAction?.title || "Nenhuma ação",
        nextActionHref: nextAction?.href || `/products/${product.id}`,
        priority,
      });
    }

    // Sort by score descending
    rankings.sort((a, b) => b.score - a.score);

    // Update positions
    rankings.forEach((r, i) => r.position = i + 1);

    return rankings;
  }

  static async getReadyProjects(organizationId: string) {
    try {
      const rankings = await this.getProjectsRanking(organizationId);
      return rankings.filter(r => r.status === "ready");
    } catch (error) {
      return [];
    }
  }

  static async getBuildingProjects(organizationId: string) {
    try {
      const rankings = await this.getProjectsRanking(organizationId);
      return rankings.filter(r => r.status === "building");
    } catch (error) {
      return [];
    }
  }

  static async getPausedProjects(organizationId: string) {
    try {
      const rankings = await this.getProjectsRanking(organizationId);
      return rankings.filter(r => r.status === "paused");
    } catch (error) {
      return [];
    }
  }

  static async getPortfolioHealth(organizationId: string): Promise<PortfolioHealth> {
    try {
      const rankings = await this.getProjectsRanking(organizationId);
      const totalProjects = rankings.length;
      const readyProjects = rankings.filter(r => r.status === "ready").length;
      const buildingProjects = rankings.filter(r => r.status === "building").length;
      const pausedProjects = rankings.filter(r => r.status === "paused").length;

      const scores = rankings.map(r => r.score);
      const averageScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
        : 0;
      const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
      const minScore = scores.length > 0 ? Math.min(...scores) : 0;

      // Calculate portfolio score based on readiness
      const portfolioScore = totalProjects > 0 
        ? Math.round((readyProjects * 100 + buildingProjects * 50) / totalProjects)
        : 0;

      let status: "EXCELLENT" | "GOOD" | "REGULAR" | "CRITICAL";
      if (portfolioScore >= 75) status = "EXCELLENT";
      else if (portfolioScore >= 50) status = "GOOD";
      else if (portfolioScore >= 25) status = "REGULAR";
      else status = "CRITICAL";

      return {
        score: portfolioScore,
        status,
        totalProjects,
        readyProjects,
        buildingProjects,
        pausedProjects,
        averageScore,
        maxScore,
        minScore,
      };
    } catch (error) {
      return {
        score: 0,
        status: "CRITICAL",
        totalProjects: 0,
        readyProjects: 0,
        buildingProjects: 0,
        pausedProjects: 0,
        averageScore: 0,
        maxScore: 0,
        minScore: 0,
      };
    }
  }

  static async getDailyQueue(organizationId: string): Promise<DailyTask[]> {
    try {
      const buildingProjects = await this.getBuildingProjects(organizationId);
      if (!buildingProjects || buildingProjects.length === 0) {
        return [];
      }

      const tasks: DailyTask[] = [];

      for (const project of buildingProjects) {
        if (!project) continue;

        const nextAction = await LaunchEngine.getNextAction(project.projectId, organizationId);
        if (nextAction) {
          tasks.push({
            id: `${project.projectId}-${Date.now()}`,
            title: nextAction.title,
            projectId: project.projectId,
            projectName: project.productName,
            estimatedMinutes: nextAction.estimatedMinutes,
            impact: nextAction.impact,
            priority: nextAction.priority,
            action: nextAction.action,
            href: nextAction.href,
          });
        }
      }

      // Sort by priority
      tasks.sort((a, b) => a.priority - b.priority);

      return tasks;
    } catch (error) {
      return [];
    }
  }

  static async getPortfolioInsights(organizationId: string): Promise<PortfolioInsights> {
    try {
      const rankings = await this.getProjectsRanking(organizationId);
      const health = await this.getPortfolioHealth(organizationId);

      const readyToSell = rankings.filter(r => r.status === "ready").length;
      const almostReady = rankings.filter(r => r.score >= 76 && r.score < 91).length;
      const abandoned = rankings.filter(r => r.status === "paused").length;
      const excellent = rankings.filter(r => r.score >= 91).length;

      const recommendations: string[] = [];
      
      if (abandoned > 0) {
        recommendations.push(`Você tem ${abandoned} projetos abandonados. Considere retomá-los ou arquivá-los.`);
      }
      
      if (almostReady > 0) {
        recommendations.push(`Você tem ${almostReady} projetos quase prontos. Foque em finalizá-los.`);
      }
      
      if (readyToSell === 0 && rankings.length > 0) {
        recommendations.push("Você ainda não tem projetos prontos para vender. Foque em finalizar pelo menos um.");
      }
      
      if (health.averageScore < 50) {
        recommendations.push("O score médio do seu portfólio está baixo. Foque em melhorar a qualidade dos projetos.");
      }

      return {
        readyToSell,
        almostReady,
        abandoned,
        excellent,
        recommendations,
      };
    } catch (error) {
      return {
        readyToSell: 0,
        almostReady: 0,
        abandoned: 0,
        excellent: 0,
        recommendations: [],
      };
    }
  }

  static async getNichoDistribution(organizationId: string): Promise<NichoDistribution[]> {
    try {
      const allProducts = await db
        .select()
        .from(products)
        .where(eq(products.organizationId, organizationId));

      if (!allProducts || allProducts.length === 0) {
        return [];
      }

      const nichoMap = new Map<string, number>();

      for (const product of allProducts) {
        if (!product) continue;

        // Simple categorization based on title
        const title = product.title?.toLowerCase() || "";
        let nicho = "Outros";
        
        if (title.includes("ia") || title.includes("inteligência") || title.includes("ai")) {
          nicho = "IA";
        } else if (title.includes("marketing") || title.includes("vendas") || title.includes("negócios")) {
          nicho = "Marketing";
        } else if (title.includes("finanças") || title.includes("dinheiro") || title.includes("investir")) {
          nicho = "Finanças";
        } else if (title.includes("educação") || title.includes("ensino") || title.includes("aprender")) {
          nicho = "Educação";
        } else if (title.includes("idioma") || title.includes("inglês") || title.includes("espanhol")) {
          nicho = "Idiomas";
        }

        nichoMap.set(nicho, (nichoMap.get(nicho) || 0) + 1);
      }

      const total = allProducts.length;
      const distribution: NichoDistribution[] = [];

      for (const [nicho, count] of nichoMap.entries()) {
        distribution.push({
          nicho,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        });
      }

      // Sort by count descending
      distribution.sort((a, b) => b.count - a.count);

      return distribution;
    } catch (error) {
      return [];
    }
  }

  static async getSmartTimeline(organizationId: string): Promise<TimelineEvent[]> {
    try {
      const events = await db
        .select()
        .from(products)
        .where(eq(products.organizationId, organizationId))
        .orderBy(desc(products.createdAt));

      if (!events || events.length === 0) {
        return [];
      }

      const timeline: TimelineEvent[] = [];

      for (const product of events) {
        if (!product) continue;

        timeline.push({
          id: product.id,
          projectId: product.id,
          productName: product.title || "Projeto",
          event: "Produto criado",
          date: product.createdAt,
        });

        // Add other events based on completion
        const score = await LaunchEngine.getScore(product.id, organizationId);
        if (score >= 20) {
          timeline.push({
            id: `${product.id}-offer`,
            projectId: product.id,
            productName: product.title || "Projeto",
            event: "Oferta criada",
            date: product.updatedAt,
          });
        }
        if (score >= 35) {
          timeline.push({
            id: `${product.id}-landing`,
            projectId: product.id,
            productName: product.title || "Projeto",
            event: "Landing criada",
            date: product.updatedAt,
          });
        }
        if (product.checkoutUrl) {
          timeline.push({
            id: `${product.id}-checkout`,
            projectId: product.id,
            productName: product.title || "Projeto",
            event: "Checkout criado",
            date: product.updatedAt,
          });
        }
        if (score >= 65) {
          timeline.push({
            id: `${product.id}-distribution`,
            projectId: product.id,
            productName: product.title || "Projeto",
            event: "Distribuição criada",
            date: product.updatedAt,
          });
        }
        if (score >= 91) {
          timeline.push({
            id: `${product.id}-ready`,
            projectId: product.id,
            productName: product.title || "Projeto",
            event: "Projeto pronto",
            date: product.updatedAt,
          });
        }
      }

      // Sort by date descending
      timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

      return timeline;
    } catch (error) {
      return [];
    }
  }
}
