import { Button } from "@/components/ui/button";
import { getLandingPageById } from "@/actions/v0";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function LandingPageV0Page({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;
  const landingPage = await getLandingPageById(id, organizationId);

  if (!landingPage) {
    notFound();
  }

  const v0Prompt = landingPage.v0Prompt || "";

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Prompt V0</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {landingPage.title}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/landing-pages/${id}`}
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 space-y-6">
        {v0Prompt ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Prompt Gerado</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Copie este prompt e cole no V0.dev para gerar sua landing page.
                </p>
              </div>
              <Button
                onClick={() => navigator.clipboard.writeText(v0Prompt)}
                variant="default"
              >
                Copiar Prompt
              </Button>
            </div>

            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">
                {v0Prompt}
              </pre>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
              <a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-md bg-zinc-100 px-4 text-sm font-medium text-zinc-900 hover:bg-white"
              >
                Abrir V0.dev
              </a>
              <a
                href={`https://v0.dev/chat/new?prompt=${encodeURIComponent(v0Prompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
              >
                Abrir no V0 com Prompt
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-4">Nenhum prompt V0 gerado ainda.</p>
            <Link
              href={`/landing-pages/${id}`}
              className="inline-flex h-10 items-center rounded-md bg-zinc-100 px-4 text-sm font-medium text-zinc-900 hover:bg-white"
            >
              Voltar para a Landing Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
