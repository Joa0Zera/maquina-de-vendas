"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TREND_SOURCES } from "@maquina/shared";
import { useState, useTransition } from "react";

interface TrendFormProps {
  action: (formData: FormData) => Promise<{ error?: any; success?: boolean }>;
  initialData?: {
    title: string;
    summary: string;
    source: "reddit" | "tiktok" | "manual";
    opportunityScore?: string;
  };
  submitText?: string;
}

export function TrendForm({ action, initialData, submitText = "Salvar" }: TrendFormProps) {
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await action(formData);

      if (result && "error" in result && result.error) {
        setErrors(result.error as Record<string, string[] | undefined>);
        return;
      }

      if (result && "success" in result) {
        setErrors({});
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          defaultValue={initialData?.title}
          placeholder="Ex: Crescimento de IA generativa em 2024"
          required
        />
        {errors.title?.map((m) => (
          <p key={m} className="text-xs text-red-400">{m}</p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">Fonte</Label>
        <select
          id="source"
          name="source"
          defaultValue={initialData?.source || "manual"}
          className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700"
          required
        >
          {TREND_SOURCES.map((source) => (
            <option key={source} value={source} className="bg-zinc-950">
              {source.charAt(0).toUpperCase() + source.slice(1)}
            </option>
          ))}
        </select>
        {errors.source?.map((m) => (
          <p key={m} className="text-xs text-red-400">{m}</p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="opportunityScore">Score de Oportunidade (0-100)</Label>
        <Input
          id="opportunityScore"
          name="opportunityScore"
          type="number"
          min="0"
          max="100"
          defaultValue={initialData?.opportunityScore}
          placeholder="Ex: 75"
        />
        {errors.opportunityScore?.map((m) => (
          <p key={m} className="text-xs text-red-400">{m}</p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Resumo</Label>
        <Textarea
          id="summary"
          name="summary"
          defaultValue={initialData?.summary}
          placeholder="Descreva a tendência e por que ela é relevante..."
          rows={4}
        />
        {errors.summary?.map((m) => (
          <p key={m} className="text-xs text-red-400">{m}</p>
        ))}
      </div>

      {errors._form?.map((m) => (
        <p key={m} className="text-sm text-red-400">{m}</p>
      ))}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Salvando..." : submitText}
      </Button>
    </form>
  );
}
