"use server";

import { FactoryRunner } from "@/modules/factory/lib/factory-runner";
import { requireOrganization } from "@/lib/session";

interface CreateProjectFactoryInput {
  organizationId: string;
  trendId?: string;
  theme?: string;
  category?: string;
  priceCents?: number;
}

export async function createProjectFactory(input: CreateProjectFactoryInput) {
  const { organizationId } = await requireOrganization();
  
  const result = await FactoryRunner.run(input);
  
  return result;
}

export async function retryProjectFactoryJob(jobId: string) {
  throw new Error("Retry functionality requires database migration for project_factory_jobs table");
}
