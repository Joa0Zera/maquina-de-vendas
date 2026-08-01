import { NextRequest, NextResponse } from "next/server";
import { aiProvider } from "@/lib/ai/provider";

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();

    // Test the AI provider
    const isConnected = await aiProvider.test();

    const executionTime = Date.now() - startTime;

    return NextResponse.json({
      connected: isConnected,
      provider: "gemini",
      model: "gemini-2.5-flash",
      executionTime,
      tokens: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    });
  } catch (error) {
    console.error("Gemini test error:", error);
    return NextResponse.json(
      {
        connected: false,
        error: "Failed to test Gemini connection",
      },
      { status: 500 }
    );
  }
}
