import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LaunchScore } from "@/components/workspace/launch-score";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FactoryResumeProps {
  productId: string;
  score: number;
  status: string;
  nextAction: {
    title: string;
    href: string;
    estimatedMinutes: number;
  };
}

export function FactoryResume({ productId, score, status, nextAction }: FactoryResumeProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Projeto criado</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Seu projeto foi criado automaticamente pela Máquina.
        </p>
      </div>
      
      <Card className="border-zinc-800 bg-zinc-950 shadow-sm">
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LaunchScore score={score} status={status} />
          
          <div className="pt-4 border-t border-zinc-800">
            <p className="text-sm font-medium text-zinc-100 mb-1">Próxima ação</p>
            <p className="text-sm text-zinc-400 mb-3">{nextAction.title}</p>
            <p className="text-xs text-zinc-500 mb-4">
              Tempo estimado: {nextAction.estimatedMinutes} minutos
            </p>
            
            <Link href={nextAction.href}>
              <Button className="w-full gap-2">
                Continuar Projeto
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
