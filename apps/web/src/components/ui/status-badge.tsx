import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusType =
  | "READY"
  | "BUILDING"
  | "SELLING"
  | "PAUSED"
  | "MISSING"
  | "ACTIVE"
  | "DISABLED"
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED"
  | "GENERATING"
  | "INACTIVE";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { label: string; variant: "default" | "success" | "warning" | "destructive" }
> = {
  READY: { label: "Pronto", variant: "success" },
  BUILDING: { label: "Em Construção", variant: "warning" },
  SELLING: { label: "Vendendo", variant: "default" },
  PAUSED: { label: "Pausado", variant: "destructive" },
  MISSING: { label: "Ausente", variant: "destructive" },
  ACTIVE: { label: "Ativo", variant: "success" },
  DISABLED: { label: "Desativado", variant: "destructive" },
  DRAFT: { label: "Rascunho", variant: "default" },
  PUBLISHED: { label: "Publicado", variant: "success" },
  ARCHIVED: { label: "Arquivado", variant: "destructive" },
  GENERATING: { label: "Gerando", variant: "warning" },
  INACTIVE: { label: "Inativo", variant: "destructive" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "default" };

  return (
    <Badge
      variant={config.variant}
      className={cn("capitalize", className)}
    >
      {config.label}
    </Badge>
  );
}
