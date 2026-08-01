export interface AIProvider {
  name: string;
  generate(prompt: string, options?: AIOptions): Promise<string>;
  test(): Promise<boolean>;
}

export interface AIOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIResponse {
  content: string;
  model: string;
  provider: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  executionTime?: number;
}

export interface AIContext {
  projectId?: string;
  organizationId: string;
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  offer?: {
    id: string;
    name: string;
    price: number;
  };
  landing?: {
    id: string;
    url: string;
  };
  checkout?: {
    id: string;
    url: string;
  };
  research?: {
    id: string;
    topic: string;
    data: any;
  };
}

export interface ChatRequest {
  message: string;
  context?: AIContext;
  projectId?: string;
  organizationId: string;
}

export interface ChatResponse {
  response: string;
  provider: string;
  tokens: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  executionTime: number;
}
