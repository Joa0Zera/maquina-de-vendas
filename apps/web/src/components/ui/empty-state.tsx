import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
    variant?: "default" | "secondary" | "ghost" | "destructive";
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        "animate-in fade-in slide-in-from-bottom-4 duration-300",
        className
      )}
    >
      {Icon && (
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-zinc-500/10 blur-3xl rounded-full" />
          <div className="relative bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
            <Icon className="h-12 w-12 text-zinc-400" />
          </div>
        </div>
      )}
      <h3 className="text-xl font-semibold tracking-tight mb-2 text-zinc-100">{title}</h3>
      <p className="text-sm text-zinc-400 mb-8 max-w-md leading-relaxed">{description}</p>
      {action && (
        <Link href={action.href}>
          <Button variant={action.variant || "default"} className="shadow-lg shadow-zinc-950/20">
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  );
}
