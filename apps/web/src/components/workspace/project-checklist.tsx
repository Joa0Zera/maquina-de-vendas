"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, LayoutDashboard, Package, FileText, Globe, CreditCard, Copy, Users, Brain, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  icon: any;
  action?: {
    label: string;
    href: string;
  };
  priority?: number;
}

interface ProjectChecklistProps {
  productId: string;
  items: ChecklistItem[];
  showProgress?: boolean;
}

export function ProjectChecklist({ productId, items, showProgress = true }: ProjectChecklistProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  // Sort by priority (incomplete items first, then by priority)
  const sortedItems = [...items].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return (a.priority || 0) - (b.priority || 0);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Checklist</h3>
        <span className="text-sm text-zinc-400">{completedCount}/{items.length}</span>
      </div>

      {showProgress && <Progress value={progress} className="h-2" />}

      <div className="space-y-2">
        {sortedItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.action?.href || "#"}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-all duration-200",
                item.completed
                  ? "border-zinc-800 bg-zinc-950/50 opacity-60"
                  : "border-zinc-700 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900"
              )}
            >
              <div className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-zinc-400">{item.description}</p>
                </div>
              </div>
              {!item.completed && item.action && (
                <Button variant="ghost" size="sm" className="gap-2">
                  {item.action.label}
                </Button>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
