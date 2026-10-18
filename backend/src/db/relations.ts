import { defineRelations } from "drizzle-orm";
import {
  categories,
  orderItems,
  orders,
  productsTable,
  usersTable,
} from "./schema";

export const relations = defineRelations(
  { orderItems, orders, usersTable, productsTable, categories },
  (r) => ({
    categories: {
      products: r.many.productsTable({
        from: r.categories.id,
        to: r.productsTable.categoryId,
      }),
    },

    productsTable: {
      category: r.one.categories({
        from: r.productsTable.categoryId,
        to: r.categories.id,
      }),
    },

    users: {
      orders: r.many.orders({
        from: r.usersTable.id,
        to: r.orders.userId,
      }),
    },

    orders: {
      user: r.one.usersTable({
        from: r.orders.userId,
        to: r.usersTable.id,
      }),
      items: r.many.orderItems({
        from: r.orders.id,
        to: r.orderItems.orderId,
      }),
    },

    orderItems: {
      order: r.one.orders({
        from: r.orderItems.orderId,
        to: r.orders.id,
      }),
      product: r.one.productsTable({
        from: r.orderItems.productId,
        to: r.productsTable.id,
      }),
    },
  }),
);
