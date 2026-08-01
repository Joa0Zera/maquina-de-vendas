import { TrendForm } from "@/components/trends/trend-form";
import { deleteTrendAction, updateTrendAction } from "@/actions/trends";
import { getTrendById, trendToFormValues } from "@/lib/trends";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditTrendPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;
  const trend = await getTrendById(id, organizationId);

  if (!trend) {
    notFound();
  }

  const formValues = trendToFormValues(trend);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Editar tendência</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Atualize as informações da tendência.
        </p>
      </div>
      <div className="max-w-xl">
        <TrendForm
          action={(formData) => updateTrendAction(id, formData)}
          initialData={formValues}
          submitText="Salvar alterações"
        />
        <div className="mt-4 flex gap-3">
          <Link
            href="/trends"
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Cancelar
          </Link>
          <form action={() => deleteTrendAction(id)}>
            <button
              type="submit"
              className="inline-flex h-9 items-center rounded-md border border-red-900/50 bg-red-950/50 px-4 text-sm text-red-400 hover:bg-red-900/50"
            >
              Excluir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
