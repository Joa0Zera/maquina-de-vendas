import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, integrationSettings } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { requireOrganization } from "@/lib/session";
import { revalidatePath } from "next/cache";

async function saveCaktoIntegration(formData: FormData) {
  "use server";

  const { organizationId } = await requireOrganization();

  const clientId = formData.get("clientId") as string;
  const clientSecret = formData.get("clientSecret") as string;

  if (!clientId || !clientSecret) {
    throw new Error("Client ID and Client Secret are required");
  }

  const [existing] = await db
    .select()
    .from(integrationSettings)
    .where(
      and(
        eq(integrationSettings.organizationId, organizationId),
        eq(integrationSettings.provider, "cakto")
      )
    )
    .limit(1);

  if (existing) {
    await db
      .update(integrationSettings)
      .set({
        clientId,
        clientSecret,
      })
      .where(eq(integrationSettings.id, existing.id));
  } else {
    await db.insert(integrationSettings).values({
      organizationId,
      provider: "cakto",
      clientId,
      clientSecret,
    });
  }

  revalidatePath("/settings/integrations/cakto");
}

async function getCaktoIntegration(organizationId: string) {
  const [integration] = await db
    .select()
    .from(integrationSettings)
    .where(
      and(
        eq(integrationSettings.organizationId, organizationId),
        eq(integrationSettings.provider, "cakto")
      )
    )
    .limit(1);

  return integration;
}

export default async function CaktoIntegrationPage() {
  const { organizationId } = await requireOrganization();
  const integration = await getCaktoIntegration(organizationId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Integração Cakto</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Configure as credenciais da API da Cakto para sincronização automática.
        </p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 space-y-6">
        <form action={saveCaktoIntegration} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientId">Client ID</Label>
            <Input
              id="clientId"
              name="clientId"
              type="text"
              placeholder="CAKTO_CLIENT_ID"
              defaultValue={integration?.clientId || ""}
              required
              className="bg-zinc-900 border-zinc-800"
            />
            <p className="text-xs text-zinc-400">
              Cole o Client ID da Cakto aqui.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientSecret">Client Secret</Label>
            <Input
              id="clientSecret"
              name="clientSecret"
              type="password"
              placeholder="CAKTO_CLIENT_SECRET"
              defaultValue={integration?.clientSecret || ""}
              required
              className="bg-zinc-900 border-zinc-800"
            />
            <p className="text-xs text-zinc-400">
              Cole o Client Secret da Cakto aqui. Será armazenado de forma segura.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Salvar Integração
          </Button>
        </form>

        {integration && (
          <div className="pt-4 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">
              Integração configurada em{" "}
              {new Date(integration.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
