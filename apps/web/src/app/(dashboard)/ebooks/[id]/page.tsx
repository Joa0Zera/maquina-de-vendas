import { Badge } from "@/components/ui/badge";
import { getEbookById } from "@/actions/ebooks";
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

export default async function EbookDetailPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;
  const ebook = await getEbookById(id, organizationId);

  if (!ebook) {
    notFound();
  }

  const structure = ebook.structure as {
    title: string;
    subtitle: string;
    introduction: string;
    conclusion: string;
    chapters: Array<{
      chapterTitle: string;
      chapterSummary: string;
    }>;
  } || {};

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{ebook.title}</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {ebook.subtitle || "Sem subtítulo"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="default" className={statusColors[ebook.status]}>
            {statusLabels[ebook.status]}
          </Badge>
          <Link
            href="/ebooks"
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Introdução</h2>
          <p className="text-zinc-300 leading-relaxed">{structure.introduction || "Sem introdução"}</p>
        </section>

        {/* Chapters */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Capítulos</h2>
          <div className="space-y-4">
            {structure.chapters && structure.chapters.length > 0 ? (
              structure.chapters.map((chapter, index) => (
                <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <h3 className="font-semibold text-zinc-200 mb-2">
                    Capítulo {index + 1}: {chapter.chapterTitle}
                  </h3>
                  <p className="text-sm text-zinc-400">{chapter.chapterSummary}</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-400">Nenhum capítulo encontrado.</p>
            )}
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Conclusão</h2>
          <p className="text-zinc-300 leading-relaxed">{structure.conclusion || "Sem conclusão"}</p>
        </section>
      </div>
    </div>
  );
}
