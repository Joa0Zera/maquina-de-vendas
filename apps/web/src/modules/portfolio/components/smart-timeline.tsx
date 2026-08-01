"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { TimelineEvent } from "@/modules/portfolio/types/portfolio";
import { formatDate } from "@/helpers/format";

interface SmartTimelineProps {
  events: TimelineEvent[];
}

export function SmartTimeline({ events }: SmartTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Histórico Global
        </h2>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="p-4">
            <p className="text-center text-zinc-400 py-8">Nenhum evento encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Histórico Global
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-4">
          <div className="space-y-3">
            {events.slice(0, 10).map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50">
                <div className="flex items-center justify-center w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.event}</p>
                  <p className="text-xs text-zinc-400">{event.productName}</p>
                </div>
                <span className="text-xs text-zinc-500">{formatDate(event.date)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
