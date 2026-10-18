import { defineRelations, One, sql } from "drizzle-orm";

import {
  date,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const orderStatus = pgEnum("order_status", [
  "Pendente",
  // "confirmed",
  // "preparing",
  // "out_for_delivery",
  "Retirado",
  "cancelado",
]);

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  cep: varchar("cep", { length: 32 }).notNull(),
  role: varchar("role", { length: 32 }).notNull().default("USER"),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull().unique(),
  price: numeric("price").notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  imgUrl: varchar("img_url", { length: 32 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

// orderItems
export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    total: numeric("total", {
      precision: 10,
      scale: 2,
      mode: "number",
    }).notNull(),
    status: orderStatus("status").notNull().default("Pendente"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("orders_user_idx").on(t.userId),
    index("orders_status_created_idx").on(t.status, t.createdAt),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    price: numeric("price", {
      precision: 10,
      scale: 2,
      mode: "number",
    }).notNull(),
    productId: integer("product_id").references(() => productsTable.id, {
      onDelete: "set null",
    }),
    quantity: integer("quantity").notNull(),
  },
  (t) => [index("order_items_order_idx").on(t.orderId)],
);
