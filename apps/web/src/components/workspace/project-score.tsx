import { CheckCircle, AlertCircle, TrendingUp, Package, FileText, Globe, CreditCard, Copy, Image, Users, DollarSign } from "lucide-react";

interface ScoreItem {
  id: string;
  title: string;
  score: number;
  icon: any;
  color: string;
}

interface ProjectScoreProps {
  productId: string;
}

export function ProjectScore({ productId }: ProjectScoreProps) {
  const scoreItems: ScoreItem[] = [
    { id: "produto", title: "Produto", score: 85, icon: Package, color: "text-purple-400" },
    { id: "oferta", title: "Oferta", score: 90, icon: FileText, color: "text-blue-400" },
    { id: "landing", title: "Landing", score: 75, icon: Globe, color: "text-green-400" },
    { id: "checkout", title: "Checkout", score: 95, icon: CreditCard, color: "text-orange-400" },
    { id: "copy", title: "Copy", score: 70, icon: Copy, color: "text-cyan-400" },
    { id: "criativos", title: "Criativos", score: 60, icon: Image, color: "text-pink-400" },
    { id: "distribuicao", title: "Distribuição", score: 80, icon: Users, color: "text-emerald-400" },
    { id: "receita", title: "Receita", score: 88, icon: DollarSign, color: "text-yellow-400" },
  ];

  const totalScore = Math.round(scoreItems.reduce((sum, item) => sum + item.score, 0) / scoreItems.length);

  const getStatus = (score: number) => {
    if (score >= 90) return { label: "Excelente", color: "text-green-400", bgColor: "bg-green-500/10" };
    if (score >= 70) return { label: "Bom", color: "text-blue-400", bgColor: "bg-blue-500/10" };
    if (score >= 50) return { label: "Regular", color: "text-yellow-400", bgColor: "bg-yellow-500/10" };
    return { label: "Precisa Melhorar", color: "text-red-400", bgColor: "bg-red-500/10" };
  };

  const status = getStatus(totalScore);

  const suggestions = [
    "Adicionar criativos de alta conversão",
    "Otimizar copy para aumentar conversão",
    "Expandir distribuição para mais canais",
    "Testar variações de landing page",
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">Score Inteligente</h3>
      
      {/* Total Score */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-zinc-400">Score Total</p>
            <p className="text-4xl font-bold text-zinc-100">{totalScore}/100</p>
          </div>
          <div className={`px-4 py-2 rounded-full ${status.bgColor} border ${status.color.replace('text-', 'border-')}`}>
            <span className={`font-medium ${status.color}`}>{status.label}</span>
          </div>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
            style={{ width: `${totalScore}%` }}
          />
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid gap-3 sm:grid-cols-2">
        {scoreItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                  <span className="text-sm font-medium text-zinc-100">{item.title}</span>
                </div>
                <span className="text-sm font-bold text-zinc-100">{item.score}/100</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-100">Sugestões de Melhoria</h4>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-950">
              <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
