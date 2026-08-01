import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai/service";
import { aiCache } from "@/lib/ai/cache";
import { ChatRequest, ChatResponse } from "@/lib/ai/types";

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    const { message, context, projectId, organizationId } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    // Check cache first
    const cachedResponse = aiCache.get(message, context);
    if (cachedResponse) {
      const chatResponse: ChatResponse = {
        response: cachedResponse,
        provider: "gemini",
        tokens: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
        executionTime: 0,
      };
      return NextResponse.json(chatResponse);
    }

    const startTime = Date.now();

    // Generate response using AI service
    const response = await aiService.chat(message, context);

    const executionTime = Date.now() - startTime;

    // Cache the response
    const tokens = {
      promptTokens: Math.ceil(message.length / 4),
      completionTokens: Math.ceil(response.length / 4),
      totalTokens: Math.ceil((message.length + response.length) / 4),
    };

    aiCache.set(message, response, context, tokens.totalTokens);

    const chatResponse: ChatResponse = {
      response,
      provider: "gemini",
      tokens,
      executionTime,
    };

    return NextResponse.json(chatResponse);
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}
