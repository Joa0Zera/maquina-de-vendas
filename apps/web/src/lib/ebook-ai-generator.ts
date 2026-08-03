import { Offer } from "@maquina/database";
import { aiService } from "@/lib/ai/service";
import { generateEbookFromOffer } from "@/lib/ebook-generator";

export interface AIEbookStructure {
  title: string;
  subtitle: string;
  introduction: string;
  conclusion: string;
  chapters: Array<{
    chapterTitle: string;
    chapterSummary: string;
    content: string;
  }>;
}

/**
 * Generates real ebook content (title, intro, chapters with full body text,
 * conclusion) using the configured AI provider. Falls back to the
 * deterministic template generator if the AI call fails or returns
 * something we can't parse, so ebook creation never hard-fails.
 */
export async function generateEbookContentWithAI(offer: Offer): Promise<AIEbookStructure> {
  const copy = (offer.copy as {
    targetAudience?: string;
    problem?: string;
    desiredOutcome?: string;
    ebookStructure?: string[];
  }) || {};

  const productName = offer.name;
  const headline = offer.headline || productName;
  const targetAudience = copy.targetAudience || "profissionais";
  const problem = copy.problem || "desafios comuns";
  const desiredOutcome = copy.desiredOutcome || "resultados melhores";
  const suggestedChapters = copy.ebookStructure || [];

  const prompt = `Você é um redator especialista em infoprodutos. Escreva o conteúdo completo de um ebook em português do Brasil sobre o produto "${productName}" (headline: "${headline}").

Público-alvo: ${targetAudience}
Problema que o produto resolve: ${problem}
Resultado desejado: ${desiredOutcome}
${suggestedChapters.length > 0 ? `Estrutura de capítulos sugerida: ${suggestedChapters.join(", ")}` : ""}

Gere um ebook com 6 a 8 capítulos. Cada capítulo deve ter conteúdo real e útil (2 a 4 parágrafos), não apenas um resumo.

Responda APENAS com um JSON válido, sem markdown, sem comentários, no formato exato:
{
  "title": "título do ebook",
  "subtitle": "subtítulo do ebook",
  "introduction": "texto de introdução (2-3 parágrafos)",
  "chapters": [
    { "chapterTitle": "título do capítulo", "chapterSummary": "resumo em uma frase", "content": "conteúdo completo do capítulo (2-4 parágrafos)" }
  ],
  "conclusion": "texto de conclusão (2-3 parágrafos)"
}`;

  try {
    const raw = await aiService.generateText(prompt, { temperature: 0.8, maxTokens: 8192 });
    const jsonText = extractJson(raw);
    const parsed = JSON.parse(jsonText);

    if (!parsed.title || !Array.isArray(parsed.chapters) || parsed.chapters.length === 0) {
      throw new Error("Resposta da IA em formato inesperado");
    }

    return {
      title: parsed.title,
      subtitle: parsed.subtitle || "",
      introduction: parsed.introduction || "",
      conclusion: parsed.conclusion || "",
      chapters: parsed.chapters.map((c: any) => ({
        chapterTitle: c.chapterTitle || "Capítulo",
        chapterSummary: c.chapterSummary || "",
        content: c.content || "",
      })),
    };
  } catch (error) {
    console.error("Ebook AI generation failed, falling back to template:", error);
    const fallback = generateEbookFromOffer(offer);
    return {
      ...fallback,
      chapters: fallback.chapters.map((c) => ({ ...c, content: c.chapterSummary })),
    };
  }
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced && fenced[1]) return fenced[1].trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }
  return text;
}
