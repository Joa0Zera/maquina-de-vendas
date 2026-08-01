import { NextResponse } from "next/server";
import { integrationManager } from "@/lib/providers/integration-manager";
import { aiProvider } from "@/lib/ai";

export async function GET() {
  try {
    const integrationStatuses = await integrationManager.getStatus();
    
    const status: Record<string, boolean> = {};
    
    integrationStatuses.forEach((s) => {
      status[s.name] = s.connected;
    });

    // Add AI status
    status.gemini = aiProvider.isProviderAvailable("gemini");

    return NextResponse.json(status);
  } catch (error) {
    console.error("Status endpoint error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
