import { NextResponse } from "next/server";
import { caktoProvider } from "@/lib/providers/cakto";

export async function GET() {
  try {
    if (!caktoProvider) {
      return NextResponse.json(
        {
          connected: false,
          error: "Cakto provider not configured. Please set CAKTO_CLIENT_ID and CAKTO_CLIENT_SECRET in .env.local",
        },
        { status: 503 }
      );
    }

    const health = await caktoProvider.health();

    return NextResponse.json(health);
  } catch (error) {
    console.error("Cakto test endpoint error:", error);
    return NextResponse.json(
      {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
