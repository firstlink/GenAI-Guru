import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";
import { mkdirSync } from "fs";
import { dirname, resolve } from "path";

const dbPath = resolve(process.env.SQLITE_DB_PATH || "./data/sqlite.db");

// Ensure the data directory exists
mkdirSync(dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);

// Enable WAL mode for crash safety and better concurrent read performance
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });

// Run migrations on startup (creates tables automatically in production)
try {
    migrate(db, { migrationsFolder: resolve(process.cwd(), "migrations") });
    console.log("Database migrations applied successfully.");
} catch (error) {
    console.error("Migration failed:", error);
}
