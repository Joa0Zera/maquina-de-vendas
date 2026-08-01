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
