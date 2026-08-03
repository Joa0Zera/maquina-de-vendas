import { NextRequest, NextResponse } from "next/server";
import { db, ebooks, offers, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { requireOrganization } from "@/lib/session";
import { generateEbookPdf } from "@/lib/ebook-pdf";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { organizationId } = await requireOrganization();
    const { id } = await params;

    const [ebook] = await db
      .select()
      .from(ebooks)
      .where(and(eq(ebooks.id, id), eq(ebooks.organizationId, organizationId)))
      .limit(1);

    if (!ebook) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
    }

    const [offerWithCheckout] = await db
      .select({ checkoutUrl: products.checkoutUrl })
      .from(offers)
      .innerJoin(products, eq(offers.productId, products.id))
      .where(eq(offers.id, ebook.offerId))
      .limit(1);

    const structure = (ebook.structure as {
      introduction?: string;
      conclusion?: string;
      chapters?: Array<{ chapterTitle: string; chapterSummary?: string; content?: string }>;
    }) || {};

    const pdfBytes = await generateEbookPdf({
      title: ebook.title,
      subtitle: ebook.subtitle,
      introduction: structure.introduction,
      conclusion: structure.conclusion,
      chapters: structure.chapters || [],
      checkoutUrl: offerWithCheckout?.checkoutUrl,
    });

    const filename = ebook.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename || "ebook"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Ebook PDF generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
