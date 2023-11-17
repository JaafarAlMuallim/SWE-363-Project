import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./db";
export const migrateDB = async () => {
  console.log("Migrating database...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Database migrated");
};
migrateDB();
