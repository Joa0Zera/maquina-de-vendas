import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Folder, File, Image, FileText, Video, Brain, BarChart3, Upload, Search, ArrowRight, MoreHorizontal, Package, Globe } from "lucide-react";

async function FilesContent({ organizationId }: { organizationId: string }) {
  const folders = [
    { id: "produtos", name: "Produtos", icon: Package, count: 12, color: "border-purple-700" },
    { id: "landing", name: "Landing", icon: Globe, count: 8, color: "border-blue-700" },
    { id: "criativos", name: "Criativos", icon: Image, count: 24, color: "border-pink-700" },
    { id: "copy", name: "Copy", icon: FileText, count: 15, color: "border-orange-700" },
    { id: "videos", name: "Vídeos", icon: Video, count: 6, color: "border-red-700" },
    { id: "ia", name: "Arquivos IA", icon: Brain, count: 18, color: "border-violet-700" },
    { id: "relatorios", name: "Relatórios", icon: BarChart3, count: 5, color: "border-cyan-700" },
    { id: "uploads", name: "Uploads", icon: Upload, count: 32, color: "border-emerald-700" },
  ];

  const files = [
    { id: "1", name: "landing-page-v1.png", type: "image", size: "2.4 MB", date: "Há 2 horas" },
    { id: "2", name: "copy-vendas.txt", type: "text", size: "45 KB", date: "Há 4 horas" },
    { id: "3", name: "video-promo.mp4", type: "video", size: "125 MB", date: "Há 1 dia" },
    { id: "4", name: "criativo-facebook.png", type: "image", size: "1.8 MB", date: "Há 2 dias" },
    { id: "5", name: "relatorio-mensal.pdf", type: "pdf", size: "2.1 MB", date: "Há 3 dias" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Arquivos"
        description="Explorer interno estilo Google Drive."
        actions={
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar arquivos e pastas..."
          className="w-full h-12 pl-12 pr-4 rounded-xl border border-zinc-800 bg-zinc-900 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent"
        />
      </div>

      {/* Folders Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Pastas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {folders.map((folder) => {
            const Icon = folder.icon;
            return (
              <div
                key={folder.id}
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-zinc-800 border ${folder.color}`}>
                    <Icon className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-100">{folder.name}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{folder.count} arquivos</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Files */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Arquivos Recentes</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80 text-zinc-500">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Nome</th>
                <th className="px-6 py-3 text-left font-medium">Tipo</th>
                <th className="px-6 py-3 text-left font-medium">Tamanho</th>
                <th className="px-6 py-3 text-left font-medium">Data</th>
                <th className="px-6 py-3 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-t border-zinc-800 hover:bg-zinc-900/50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <File className="h-4 w-4 text-zinc-400" />
                      <span className="text-zinc-100">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-zinc-400">{file.type}</td>
                  <td className="px-6 py-3 text-zinc-400">{file.size}</td>
                  <td className="px-6 py-3 text-zinc-400">{file.date}</td>
                  <td className="px-6 py-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default async function FilesPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <FilesContent organizationId={organizationId} />
    </Suspense>
  );
}
