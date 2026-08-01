import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LandingPagePreview } from "@/components/landing-pages/landing-page-preview";
import { getLandingPageById } from "@/lib/landing-pages";
import { generateV0PromptAction } from "@/actions/v0";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  generating: "Gerando",
  ready: "Pronto",
  published: "Publicado",
  archived: "Arquivado",
};

const statusColors: Record<string, string> = {
  draft: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  generating: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  ready: "border-green-500/30 bg-green-500/10 text-green-400",
  published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  archived: "border-gray-500/30 bg-gray-500/10 text-gray-400",
};

const v0StatusLabels: Record<string, string> = {
  pending: "Pendente",
  generated: "Gerado",
  deployed: "Implantado",
};

const v0StatusColors: Record<string, string> = {
  pending: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  generated: "border-green-500/30 bg-green-500/10 text-green-400",
  deployed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

const deploymentStatusLabels: Record<string, string> = {
  pending: "Pendente",
  deployed: "Implantado",
  failed: "Falhou",
};

const deploymentStatusColors: Record<string, string> = {
  pending: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  deployed: "border-green-500/30 bg-green-500/10 text-green-400",
  failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default async function LandingPageDetailPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;
  const landingPage = await getLandingPageById(id, organizationId);

  if (!landingPage) {
    notFound();
  }

  const sections = landingPage.sections as {
    hero: { headline: string; subheadline: string; cta: string };
    problem: { painPoints: string[] };
    solution: { explanation: string };
    benefits: { benefits: string[] };
    offer: { presentation: string; uniqueMechanism: string; offerStack: string[]; guarantee: string };
    objectionHandling: { objections: string[] };
    faq: { questions: Array<{ question: string; answer: string }> };
    cta: { finalCallToAction: string };
  } || {};

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{landingPage.title}</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {landingPage.offerName || "Sem oferta vinculada"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="default" className={statusColors[landingPage.status]}>
            {statusLabels[landingPage.status]}
          </Badge>
          {landingPage.v0Status && (
            <Badge variant="default" className={v0StatusColors[landingPage.v0Status]}>
              V0: {v0StatusLabels[landingPage.v0Status]}
            </Badge>
          )}
          {landingPage.deploymentStatus && (
            <Badge variant="default" className={deploymentStatusColors[landingPage.deploymentStatus]}>
              Deploy: {deploymentStatusLabels[landingPage.deploymentStatus]}
            </Badge>
          )}
          <Link
            href="/landing-pages"
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <form action={generateV0PromptAction.bind(null, id)}>
          <Button type="submit" variant="default">
            Gerar Prompt V0
          </Button>
        </form>
        {landingPage.v0Prompt && (
          <Link href={`/landing-pages/${id}/v0`}>
            <Button variant="secondary">
              Copiar para V0
            </Button>
          </Link>
        )}
        <Link href={`/landing-pages/${id}/deploy`}>
          <Button variant="secondary">
            Registrar Deploy
          </Button>
        </Link>
        {landingPage.deploymentUrl && (
          <a
            href={landingPage.deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default">
              Abrir Landing
            </Button>
          </a>
        )}
      </div>

      <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950">
        <LandingPagePreview sections={sections} title={landingPage.title} />
      </div>
    </div>
  );
}
