import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { config } from "dotenv";
config();
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });
export default db;
