export interface ProjectRanking {
  position: number;
  projectId: string;
  productName: string;
  score: number;
  status: "ready" | "building" | "paused";
  nextAction: string;
  nextActionHref: string;
  priority: "ALTA" | "MÉDIA" | "BAIXA";
}

export interface PortfolioHealth {
  score: number;
  status: "EXCELLENT" | "GOOD" | "REGULAR" | "CRITICAL";
  totalProjects: number;
  readyProjects: number;
  buildingProjects: number;
  pausedProjects: number;
  averageScore: number;
  maxScore: number;
  minScore: number;
}

export interface DailyTask {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  estimatedMinutes: number;
  impact: "Muito Alto" | "Alto" | "Médio" | "Baixo";
  priority: number;
  action: string;
  href: string;
}

export interface PortfolioInsights {
  readyToSell: number;
  almostReady: number;
  abandoned: number;
  excellent: number;
  recommendations: string[];
}

export interface NichoDistribution {
  nicho: string;
  count: number;
  percentage: number;
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  productName: string;
  event: string;
  date: Date;
}
