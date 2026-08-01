import { TrendForm } from "@/components/trends/trend-form";
import { createTrendAction } from "@/actions/trends";
import Link from "next/link";

export default function NewTrendPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Nova tendência</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Adicione uma nova tendência para monitorar oportunidades.
        </p>
      </div>
      <div className="max-w-xl">
        <TrendForm action={createTrendAction} submitText="Criar tendência" />
        <div className="mt-4">
          <Link
            href="/trends"
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}
