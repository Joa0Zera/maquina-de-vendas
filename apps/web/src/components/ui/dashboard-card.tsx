import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description?: string;
  status?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  clickable?: boolean;
}

export function DashboardCard({
  title,
  description,
  status,
  action,
  footer,
  children,
  className,
  clickable = false,
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-zinc-800/80 bg-zinc-950/50 shadow-sm",
        "hover:shadow-lg hover:shadow-zinc-950/20 hover:border-zinc-700/80",
        "hover:-translate-y-0.5 hover:scale-[1.01]",
        "transition-all duration-200 ease-out",
        clickable && "cursor-pointer",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {status && <div className="flex-shrink-0">{status}</div>}
        </div>
      </CardHeader>
      {children && <CardContent className="pb-3">{children}</CardContent>}
      {(action || footer) && (
        <CardFooter className="pt-3 flex items-center justify-between border-t border-zinc-800/50">
          {action && <div className="flex items-center gap-3">{action}</div>}
          {footer && <div className="text-sm text-muted-foreground">{footer}</div>}
        </CardFooter>
      )}
    </Card>
  );
}
