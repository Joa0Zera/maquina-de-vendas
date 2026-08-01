export function formatCurrencyFromCents(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export function formatScore(score: number): string {
  return `${score}/100`;
}

export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    EXCELLENT: "Excelente",
    VERY_GOOD: "Muito Bom",
    GOOD: "Bom",
    REGULAR: "Regular",
    POOR: "Ruim",
    PUBLISHED: "Publicado",
    DRAFT: "Rascunho",
  };
  return statusMap[status] || status;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatProgress(completed: number, total: number): string {
  const percentage = Math.round((completed / total) * 100);
  return `${percentage}%`;
}

export function formatBadge(status: string): { label: string; color: string } {
  const badgeMap: Record<string, { label: string; color: string }> = {
    EXCELLENT: { label: "Excelente", color: "green" },
    VERY_GOOD: { label: "Muito Bom", color: "blue" },
    GOOD: { label: "Bom", color: "yellow" },
    REGULAR: { label: "Regular", color: "orange" },
    POOR: { label: "Ruim", color: "red" },
    PUBLISHED: { label: "Publicado", color: "green" },
    DRAFT: { label: "Rascunho", color: "gray" },
  };
  return badgeMap[status] || { label: status, color: "gray" };
}
