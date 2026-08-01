import { db, memberships } from "@maquina/database";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function getOrganizationIdForUser(userId: string) {
  const session = await getSession();
  const fromSession = session?.session.activeOrganizationId;
  if (fromSession) return fromSession;

  const [membership] = await db
    .select({ organizationId: memberships.organizationId })
    .from(memberships)
    .where(eq(memberships.userId, userId))
    .limit(1);

  return membership?.organizationId ?? null;
}

export async function getAuthContext() {
  const session = await getSession();
  if (!session?.user) return null;

  const organizationId = await getOrganizationIdForUser(session.user.id);
  if (!organizationId) return null;

  return { session, organizationId, user: session.user };
}

export async function requireOrganization() {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  return ctx;
}
