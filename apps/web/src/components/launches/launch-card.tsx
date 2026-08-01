import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LaunchItem } from "@/lib/launches";
import Link from "next/link";

interface LaunchCardProps {
  launch: LaunchItem;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const overallStatusColors: Record<string, string> = {
    READY_TO_SELL: "border-green-500/30 bg-green-500/10 text-green-400",
    IN_PROGRESS: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  };

  const overallStatusLabels: Record<string, string> = {
    READY_TO_SELL: "PRONTO PARA VENDER",
    IN_PROGRESS: "EM ANDAMENTO",
  };

  const statusColors: Record<string, string> = {
    READY: "text-green-400",
    MISSING: "text-red-400",
  };

  const commercialStatusColors: Record<string, string> = {
    DRAFT: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
    BUILDING: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    READY: "border-green-500/30 bg-green-500/10 text-green-400",
    SELLING: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    PAUSED: "border-red-500/30 bg-red-500/10 text-red-400",
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-200 mb-1">{launch.productName}</h3>
          <p className="text-sm text-zinc-400">{launch.offerName}</p>
        </div>
        <Badge variant="default" className={overallStatusColors[launch.overallStatus]}>
          {overallStatusLabels[launch.overallStatus]}
        </Badge>
      </div>

      {/* Score and Commercial Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Score:</span>
          <span className={`text-lg font-semibold ${getScoreColor(launch.launchScore)}`}>
            {launch.launchScore} / 100
          </span>
        </div>
        <Badge variant="default" className={commercialStatusColors[launch.commercialStatus]}>
          {launch.commercialStatus}
        </Badge>
      </div>

      {/* Next Action */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-400">Próxima ação:</span>
        <span className="text-sm text-zinc-200">{launch.nextAction}</span>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.trafficResearchStatus]}>
            {launch.trafficResearchStatus === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">Traffic Research</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.copyStatus]}>
            {launch.copyStatus === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">Copy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.organicDistributionStatus]}>
            {launch.organicDistributionStatus === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">Distribuição Orgânica</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.ebookStatus]}>
            {launch.ebookStatus === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">Ebook</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.landingStatus]}>
            {launch.landingStatus === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">Landing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.v0Status]}>
            {launch.v0Status === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">V0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.deployStatus]}>
            {launch.deployStatus === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">Deploy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusColors[launch.checkoutStatus]}>
            {launch.checkoutStatus === "READY" ? "✅" : "❌"}
          </span>
          <span className="text-sm text-zinc-300">Checkout</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
        <Link href={`/products/${launch.productId}`}>
          <Button variant="secondary" size="sm">
            {launch.nextAction}
          </Button>
        </Link>
        {launch.overallStatus === "READY_TO_SELL" && (
          <>
            {launch.deploymentUrl && (
              <a
                href={launch.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" size="sm">
                  Abrir Landing
                </Button>
              </a>
            )}
            {launch.caktoCheckoutUrl && (
              <a
                href={launch.caktoCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" size="sm">
                  Abrir Checkout
                </Button>
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
