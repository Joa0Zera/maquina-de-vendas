import { db, organizations } from "@maquina/database";
import { eq } from "drizzle-orm";
import { AIContext } from "@/lib/ai/types";

export async function getOrganizationContext(organizationId: string): Promise<AIContext> {
  const context: AIContext = {
    organizationId,
  };

  try {
    // Get organization information
    const [organization] = await db
      .select({
        id: organizations.id,
        name: organizations.name,
      })
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);

    if (organization) {
      // Could add organization-specific context here
      // For example: industry, target audience, brand voice, etc.
    }
  } catch (error) {
    console.error("Error fetching organization context:", error);
  }

  return context;
}

export async function getFullContext(
  projectId: string,
  organizationId: string
): Promise<AIContext> {
  const { getProjectContext } = await import("./project-context");
  
  const projectContext = await getProjectContext(projectId, organizationId);
  
  return {
    ...projectContext,
    organizationId,
  };
}
