import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgSchema } from "drizzle-orm/pg-core";
import { relations } from "./relations";

export const db = drizzle(process.env.DATABASE_URL!, { relations });
export default db;
