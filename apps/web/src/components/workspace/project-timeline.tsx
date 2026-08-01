import { Clock, CheckCircle, Package, FileText, Globe, CreditCard, Copy, Image, TrendingUp, DollarSign } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  icon: any;
  date: string;
  status: "completed" | "pending" | "in-progress";
}

interface ProjectTimelineProps {
  productId: string;
}

export function ProjectTimeline({ productId }: ProjectTimelineProps) {
  const events: TimelineEvent[] = [
    {
      id: "1",
      title: "Projeto criado",
      description: "Início do projeto",
      icon: Package,
      date: "Hoje",
      status: "completed",
    },
    {
      id: "2",
      title: "Produto criado",
      description: "Definição do produto",
      icon: Package,
      date: "Hoje",
      status: "completed",
    },
    {
      id: "3",
      title: "Oferta criada",
      description: "Estrutura da oferta",
      icon: FileText,
      date: "Hoje",
      status: "completed",
    },
    {
      id: "4",
      title: "Landing criada",
      description: "Página de vendas",
      icon: Globe,
      date: "Hoje",
      status: "in-progress",
    },
    {
      id: "5",
      title: "Checkout criado",
      description: "Configuração de pagamento",
      icon: CreditCard,
      date: "Pendente",
      status: "pending",
    },
    {
      id: "6",
      title: "Copy criada",
      description: "Materiais de venda",
      icon: Copy,
      date: "Pendente",
      status: "pending",
    },
    {
      id: "7",
      title: "Criativos criados",
      description: "Materiais de anúncio",
      icon: Image,
      date: "Pendente",
      status: "pending",
    },
    {
      id: "8",
      title: "Primeiro acesso",
      description: "Primeira visita",
      icon: TrendingUp,
      date: "Pendente",
      status: "pending",
    },
    {
      id: "9",
      title: "Primeira venda",
      description: "Primeira conversão",
      icon: DollarSign,
      date: "Pendente",
      status: "pending",
    },
    {
      id: "10",
      title: "100 vendas",
      description: "Meta alcançada",
      icon: CheckCircle,
      date: "Pendente",
      status: "pending",
    },
    {
      id: "11",
      title: "Escalando",
      description: "Crescimento acelerado",
      icon: TrendingUp,
      date: "Pendente",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">Timeline do Projeto</h3>
      <div className="space-y-3">
        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.status === "completed" 
                    ? "bg-green-500/10 border border-green-500/20" 
                    : event.status === "in-progress"
                    ? "bg-blue-500/10 border border-blue-500/20"
                    : "bg-zinc-800 border border-zinc-700"
                }`}>
                  <Icon className={`h-4 w-4 ${
                    event.status === "completed" 
                      ? "text-green-400" 
                      : event.status === "in-progress"
                      ? "text-blue-400"
                      : "text-zinc-500"
                  }`} />
                </div>
                {index < events.length - 1 && (
                  <div className={`w-0.5 flex-1 my-2 ${
                    event.status === "completed" ? "bg-green-500/20" : "bg-zinc-800"
                  }`} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-zinc-100">{event.title}</h4>
                  <span className="text-xs text-zinc-500">{event.date}</span>
                </div>
                <p className="text-sm text-zinc-400">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
