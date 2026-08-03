import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib";

export interface EbookPdfInput {
  title: string;
  subtitle?: string | null;
  introduction?: string | null;
  conclusion?: string | null;
  chapters: Array<{
    chapterTitle: string;
    chapterSummary?: string;
    content?: string;
  }>;
  checkoutUrl?: string | null;
}

const PAGE_SIZE = PageSizes.A4;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_SIZE[0] - MARGIN * 2;

export async function generateEbookPdf(input: EbookPdfInput): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const dark = rgb(0.09, 0.09, 0.09);
  const gray = rgb(0.4, 0.4, 0.4);
  const accent = rgb(0.13, 0.55, 0.13);

  // Cover page
  const cover = pdfDoc.addPage(PAGE_SIZE);
  drawWrappedText(cover, input.title, {
    font: boldFont,
    size: 30,
    color: dark,
    x: MARGIN,
    y: PAGE_SIZE[1] - 220,
    maxWidth: CONTENT_WIDTH,
    lineHeight: 36,
  });
  if (input.subtitle) {
    drawWrappedText(cover, input.subtitle, {
      font,
      size: 16,
      color: gray,
      x: MARGIN,
      y: PAGE_SIZE[1] - 320,
      maxWidth: CONTENT_WIDTH,
      lineHeight: 22,
    });
  }
  cover.drawLine({
    start: { x: MARGIN, y: PAGE_SIZE[1] - 360 },
    end: { x: MARGIN + 120, y: PAGE_SIZE[1] - 360 },
    thickness: 3,
    color: accent,
  });

  // Table of contents
  const toc = pdfDoc.addPage(PAGE_SIZE);
  let y = PAGE_SIZE[1] - MARGIN;
  y = drawHeading(toc, "Sumário", boldFont, dark, y);
  y -= 10;
  toc.drawText("Introdução", { x: MARGIN, y, size: 12, font, color: gray });
  y -= 22;
  input.chapters.forEach((chapter, index) => {
    toc.drawText(`${index + 1}. ${chapter.chapterTitle}`, {
      x: MARGIN,
      y,
      size: 12,
      font,
      color: dark,
    });
    y -= 22;
  });
  toc.drawText("Conclusão", { x: MARGIN, y, size: 12, font, color: gray });

  // Introduction
  if (input.introduction) {
    addTextPage(pdfDoc, font, boldFont, dark, "Introdução", input.introduction);
  }

  // Chapters
  input.chapters.forEach((chapter, index) => {
    addTextPage(
      pdfDoc,
      font,
      boldFont,
      dark,
      `Capítulo ${index + 1}: ${chapter.chapterTitle}`,
      chapter.content || chapter.chapterSummary || ""
    );
  });

  // Conclusion
  if (input.conclusion) {
    addTextPage(pdfDoc, font, boldFont, dark, "Conclusão", input.conclusion);
  }

  // CTA page
  const cta = pdfDoc.addPage(PAGE_SIZE);
  let ctaY = PAGE_SIZE[1] / 2 + 60;
  ctaY = drawWrappedText(cta, "Gostou do que aprendeu?", {
    font: boldFont,
    size: 22,
    color: dark,
    x: MARGIN,
    y: ctaY,
    maxWidth: CONTENT_WIDTH,
    lineHeight: 28,
  });
  ctaY -= 16;
  if (input.checkoutUrl) {
    ctaY = drawWrappedText(
      cta,
      `Acesse: ${input.checkoutUrl}`,
      { font, size: 14, color: accent, x: MARGIN, y: ctaY, maxWidth: CONTENT_WIDTH, lineHeight: 20 }
    );
  } else {
    drawWrappedText(
      cta,
      "Fale com quem te enviou este material para saber mais.",
      { font, size: 14, color: gray, x: MARGIN, y: ctaY, maxWidth: CONTENT_WIDTH, lineHeight: 20 }
    );
  }

  return pdfDoc.save();
}

function addTextPage(
  pdfDoc: PDFDocument,
  font: any,
  boldFont: any,
  dark: any,
  title: string,
  body: string
) {
  let page = pdfDoc.addPage(PAGE_SIZE);
  let y = PAGE_SIZE[1] - MARGIN;
  y = drawHeading(page, title, boldFont, dark, y);
  y -= 10;

  const paragraphs = body.split(/\n+/).filter(Boolean);
  for (const paragraph of paragraphs) {
    const lines = wrapText(paragraph, font, 12, CONTENT_WIDTH);
    for (const line of lines) {
      if (y < MARGIN) {
        page = pdfDoc.addPage(PAGE_SIZE);
        y = PAGE_SIZE[1] - MARGIN;
      }
      page.drawText(line, { x: MARGIN, y, size: 12, font, color: rgb(0.2, 0.2, 0.2) });
      y -= 18;
    }
    y -= 10;
  }
}

function drawHeading(page: any, text: string, font: any, color: any, y: number): number {
  page.drawText(text, { x: MARGIN, y, size: 20, font, color });
  return y - 30;
}

function drawWrappedText(
  page: any,
  text: string,
  opts: { font: any; size: number; color: any; x: number; y: number; maxWidth: number; lineHeight: number }
): number {
  const lines = wrapText(text, opts.font, opts.size, opts.maxWidth);
  let y = opts.y;
  for (const line of lines) {
    page.drawText(line, { x: opts.x, y, size: opts.size, font: opts.font, color: opts.color });
    y -= opts.lineHeight;
  }
  return y;
}

function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, size);
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
