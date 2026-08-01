"use client";

import { useState, useRef, useEffect } from "react";
import { Brain, X, Sparkles, FileText, Search, Globe, Zap, TrendingUp, Package, MessageSquare, ArrowRight, CreditCard, Rocket, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChatResponse } from "@/lib/ai/types";

const quickActions = [
  { id: "oferta", label: "Criar oferta", icon: Sparkles, prompt: "Crie uma oferta irresistível para um infoproduto" },
  { id: "headline", label: "Melhorar headline", icon: FileText, prompt: "Melhore esta headline para aumentar conversão" },
  { id: "copy", label: "Criar copy", icon: FileText, prompt: "Crie copy persuasiva para vendas" },
  { id: "landing", label: "Criar landing", icon: Globe, prompt: "Crie estrutura de landing page de alta conversão" },
  { id: "mercado", label: "Pesquisar mercado", icon: Search, prompt: "Pesquise mercado e tendências" },
  { id: "anuncios", label: "Gerar anúncios", icon: Zap, prompt: "Crie anúncios para redes sociais" },
  { id: "produto", label: "Analisar produto", icon: Package, prompt: "Analise este produto e sugira melhorias" },
  { id: "objecoes", label: "Responder objeções", icon: MessageSquare, prompt: "Liste e responda às principais objeções" },
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
          organizationId: "default", // TODO: Get from session
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("AI chat error:", err);
      setError("Falha ao conectar com a IA. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const retryLastMessage = () => {
    if (messages.length === 0) return;
    
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (lastUserMessage) {
      // Remove the last assistant message if there was an error
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === "assistant") {
          return prev.slice(0, -1);
        }
        return prev;
      });
      sendMessage(lastUserMessage.content);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 backdrop-blur-sm"
      >
        <Brain className="h-6 w-6 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-[600px] bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl hover:shadow-xl transition-all z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <span className="font-semibold text-zinc-100">IA Assistente</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-zinc-800/50 rounded-lg transition-all"
        >
          <X className="h-4 w-4 text-zinc-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <p className="text-sm text-zinc-400">Como posso ajudar você hoje?</p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Brain className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-xl px-4 py-3 shadow-sm",
                msg.role === "user"
                  ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                  : "bg-zinc-800/80 backdrop-blur-sm text-zinc-100 border border-zinc-700/50"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-zinc-400" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div className="bg-zinc-800 rounded-lg px-4 py-3">
              <Loader2 className="h-4 w-4 text-zinc-400 animate-spin" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-red-400" />
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={retryLastMessage}
                className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 0 && (
        <div className="p-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 mb-3">Ações Rápidas</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors text-left"
                >
                  <Icon className="h-4 w-4 text-zinc-400" />
                  <span className="text-xs text-zinc-100">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Pergunte algo à IA..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(message);
              }
            }}
            disabled={isLoading}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
          />
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => sendMessage(message)}
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
