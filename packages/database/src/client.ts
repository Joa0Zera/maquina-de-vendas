import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";

export function createDb(connectionString: string) {
  const client = postgres(connectionString, { max: 10 });
  return drizzle(client, { schema });
}

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://maquina:maquina@localhost:5432/maquina_de_vendas";

export const db = createDb(connectionString);
