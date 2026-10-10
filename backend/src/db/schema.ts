import { sql } from "drizzle-orm";
import { varchar } from "drizzle-orm/cockroach-core";
import {
  date,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  cep: varchar("cep", { length: 32 }).notNull(),
  role: varchar("role", { length: 32 }).notNull().default("USER"),
});

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull().unique(),
  price: numeric("price").notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  imgUrl: varchar("img_url", { length: 32 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});
