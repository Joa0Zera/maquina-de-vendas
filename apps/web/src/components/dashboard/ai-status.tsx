"use client";

import { useState, useEffect } from "react";
import { Brain, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIStatusData {
  provider: string;
  status: "connected" | "disconnected" | "testing";
  model: string;
  lastExecution: string;
  averageTime: number;
  tokensUsed: number;
}

export function AIStatus() {
  const [status, setStatus] = useState<AIStatusData>({
    provider: "Gemini",
    status: "testing",
    model: "gemini-2.5-flash",
    lastExecution: "-",
    averageTime: 0,
    tokensUsed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/integrations/gemini/test");
      const data = await response.json();

      setStatus({
        provider: "Gemini",
        status: data.connected ? "connected" : "disconnected",
        model: "gemini-2.5-flash",
        lastExecution: new Date().toLocaleTimeString(),
        averageTime: data.executionTime || 0,
        tokensUsed: data.tokens?.totalTokens || 0,
      });
    } catch (error) {
      setStatus((prev) => ({ ...prev, status: "disconnected" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = () => {
    setStatus((prev) => ({ ...prev, status: "testing" }));
    checkStatus();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Carregando status IA...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl shadow-sm hover:shadow-lg hover:border-zinc-700/50 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-medium text-zinc-100">{status.provider}</p>
          <p className="text-xs text-zinc-500">{status.model}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {status.status === "connected" ? (
          <CheckCircle className="h-4 w-4 text-green-400" />
        ) : status.status === "testing" ? (
          <Loader2 className="h-4 w-4 text-zinc-400 animate-spin" />
        ) : (
          <XCircle className="h-4 w-4 text-red-400" />
        )}
        <span className={cn(
          "text-xs",
          status.status === "connected" ? "text-green-400" :
          status.status === "testing" ? "text-zinc-400" :
          "text-red-400"
        )}>
          {status.status === "connected" ? "Conectado" :
           status.status === "testing" ? "Testando..." :
           "Não conectado"}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <Clock className="h-3 w-3" />
        <span>{status.lastExecution}</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span>Tempo médio: {status.averageTime}ms</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span>Tokens: {status.tokensUsed}</span>
      </div>

      <button
        onClick={handleTest}
        disabled={status.status === "testing"}
        className="px-3 py-1.5 text-xs rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 transition-colors disabled:opacity-50 backdrop-blur-sm"
      >
        {status.status === "testing" ? "Testando..." : "Testar"}
      </button>
    </div>
  );
}
