import { redirect } from "next/navigation";
import { createProjectFactory } from "@/actions/product-factory";
import { requireOrganization } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default async function NewProductPage() {
  const { organizationId } = await requireOrganization();

  async function createProject(formData: FormData) {
    "use server";
    
    const theme = formData.get("theme") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    
    const priceCents = price ? Math.round(parseFloat(price) * 100) : 0;
    
    const result = await createProjectFactory({
      organizationId,
      theme,
      category,
      priceCents,
    });
    
    redirect(`/products/${result.productId}`);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Criar Projeto</h1>
        <p className="text-sm text-zinc-400 mt-1">
          A Máquina irá criar automaticamente todo o pipeline do seu projeto.
        </p>
      </div>
      
      <Card className="border-zinc-800 bg-zinc-950 shadow-sm">
        <CardHeader>
          <CardTitle>Configuração Inicial</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Input
                id="theme"
                name="theme"
                placeholder="Ex: Marketing Digital, Programação, Finanças..."
                required
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                name="category"
                placeholder="Ex: Educação, Negócios, Saúde..."
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Preço sugerido (R$)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Ex: 97.00"
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
            
            <Button type="submit" className="w-full gap-2" size="lg">
              <Rocket className="h-4 w-4" />
              Criar Projeto
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
