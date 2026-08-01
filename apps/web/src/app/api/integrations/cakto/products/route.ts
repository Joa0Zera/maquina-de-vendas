import { NextRequest, NextResponse } from "next/server";
import { caktoProvider } from "@/lib/providers/cakto";

export async function POST(request: NextRequest) {
  try {
    if (!caktoProvider) {
      return NextResponse.json(
        {
          error: "Cakto provider not configured. Please set CAKTO_CLIENT_ID and CAKTO_CLIENT_SECRET in .env.local",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, description, price } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Missing required fields: name and price" },
        { status: 400 }
      );
    }

    // Evita duplicar produtos já sincronizados com a Cakto: se já existir um
    // produto com o mesmo nome, reaproveita em vez de criar outro.
    const existingProducts = await caktoProvider.listProducts();
    const existing = existingProducts.find((p) => p.name === name);

    if (existing) {
      return NextResponse.json(
        { productId: existing.id, existing: true },
        { status: 200 }
      );
    }

    const result = await caktoProvider.createProductWithOffer({
      name,
      description,
      price,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cakto create product endpoint error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!caktoProvider) {
      return NextResponse.json(
        {
          error: "Cakto provider not configured. Please set CAKTO_CLIENT_ID and CAKTO_CLIENT_SECRET in .env.local",
        },
        { status: 503 }
      );
    }

    const products = await caktoProvider.listProducts();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Cakto list products endpoint error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
