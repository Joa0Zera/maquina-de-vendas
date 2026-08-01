"use client";

import { Button } from "@/components/ui/button";
import { importTrendsAction } from "@/actions/trend-import";
import { useState, useTransition } from "react";

export function ImportTrendsButton() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ imported: number; skipped: number; errors: string[]; credentialError?: string } | null>(null);

  function handleImport() {
    startTransition(async () => {
      const res = await importTrendsAction();
      setResult(res);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <Button onClick={handleImport} disabled={pending}>
        {pending ? "Importando..." : "Importar tendências"}
      </Button>
      {result && (
        <div className="text-sm text-zinc-400">
          {result.credentialError ? (
            <span className="text-red-400">{result.credentialError}</span>
          ) : (
            <>
              {result.imported} importadas, {result.skipped} ignoradas
              {result.errors.length > 0 && ` (${result.errors.length} erros)`}
            </>
          )}
        </div>
      )}
    </div>
  );
}
