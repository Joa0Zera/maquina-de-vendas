import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLandingPageById } from "@/actions/v0";
import { registerDeploymentAction } from "@/actions/v0";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

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

export default async function LandingPageDeployPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;
  const landingPage = await getLandingPageById(id, organizationId);

  if (!landingPage) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Registrar Deploy</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {landingPage.title}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {landingPage.deploymentStatus && (
            <Badge variant="default" className={deploymentStatusColors[landingPage.deploymentStatus]}>
              {deploymentStatusLabels[landingPage.deploymentStatus]}
            </Badge>
          )}
          <Link
            href={`/landing-pages/${id}`}
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 space-y-6">
        {landingPage.deploymentUrl ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Deploy Atual</h2>
              <p className="text-sm text-zinc-400 mb-4">
                Esta landing page já possui um deploy registrado.
              </p>
              <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-300 mb-2">URL:</p>
                <a
                  href={landingPage.deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:underline"
                >
                  {landingPage.deploymentUrl}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Registrar Novo Deploy</h2>
            <form action={registerDeploymentAction.bind(null, id)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deploymentUrl">URL do Deploy</Label>
                <Input
                  id="deploymentUrl"
                  name="deploymentUrl"
                  type="url"
                  placeholder="https://seu-projeto.vercel.app"
                  required
                  className="bg-zinc-900 border-zinc-800"
                />
                <p className="text-xs text-zinc-400">
                  Cole a URL do seu projeto Vercel aqui.
                </p>
              </div>
              <Button type="submit" className="w-full">
                Registrar Deploy
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
