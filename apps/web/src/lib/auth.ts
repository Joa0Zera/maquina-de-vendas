import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import {
  authAccount,
  authSession,
  authUser,
  authVerification,
  db,
  memberships,
  organizations,
} from "@maquina/database";
import { betterAuth } from "better-auth";
import { eq } from "drizzle-orm";
import { slugify } from "./utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: authUser,
      session: authSession,
      account: authAccount,
      verification: authVerification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    additionalFields: {
      activeOrganizationId: {
        type: "string",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const baseSlug = slugify(user.name || "workspace") || "workspace";
          const slug = `${baseSlug}-${user.id.slice(0, 8)}`;

          const [org] = await db
            .insert(organizations)
            .values({
              name: `Workspace de ${user.name}`,
              slug,
            })
            .returning();

          if (!org) return;

          await db.insert(memberships).values({
            organizationId: org.id,
            userId: user.id,
            role: "owner",
          });

          const sessions = await db
            .select()
            .from(authSession)
            .where(eq(authSession.userId, user.id));

          const latest = sessions.at(-1);
          if (latest) {
            await db
              .update(authSession)
              .set({ activeOrganizationId: org.id })
              .where(eq(authSession.id, latest.id));
          }
        },
      },
    },
  },
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ],
  secret: process.env.BETTER_AUTH_SECRET ?? "dev-only-change-in-production",
});
