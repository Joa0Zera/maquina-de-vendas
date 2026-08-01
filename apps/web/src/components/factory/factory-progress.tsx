"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FactoryProgressProps {
  currentStep: string;
  steps: string[];
}

export function FactoryProgress({ currentStep, steps }: FactoryProgressProps) {
  const getStepStatus = (step: string) => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "running";
    return "pending";
  };

  return (
    <Card className="border-zinc-800 bg-zinc-950 shadow-sm">
      <CardHeader>
        <CardTitle>Criando Projeto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step) => {
            const status = getStepStatus(step);
            return (
              <div key={step} className="flex items-center gap-3">
                {status === "completed" && (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                )}
                {status === "running" && (
                  <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
                )}
                {status === "pending" && (
                  <Circle className="h-5 w-5 text-zinc-600" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    status === "completed" && "text-zinc-400",
                    status === "running" && "text-zinc-100 font-medium",
                    status === "pending" && "text-zinc-600"
                  )}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
