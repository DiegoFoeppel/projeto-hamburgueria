import { type Request, type Response } from "express";
import db from "../db/index.js";
import { orderItems, orders, productsTable, usersTable } from "../db/schema.js";
import { getUser } from "../utils.js";
import bcrypt from "bcrypt";
import { eq, inArray } from "drizzle-orm";
import { getProduct } from "../db/queries.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await db.select().from(orders);

    return res.status(200).json({ allOrders });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, id));

    const items = userOrders.length
      ? await db
          .select({
            id: orderItems.id,
            orderId: orderItems.orderId,
            productId: orderItems.productId,
            quantity: orderItems.quantity,
            price: orderItems.price,
            productName: productsTable.name,
          })
          .from(orderItems)
          .leftJoin(productsTable, eq(orderItems.productId, productsTable.id))
          .where(
            inArray(
              orderItems.orderId,
              userOrders.map((o) => o.id),
            ),
          )
      : [];

    console.log("Items", items);

    const result = userOrders.map((o) => ({
      ...o,
      items: items.filter((i) => i.orderId === o.id),
    }));

    return res.status(200).json({ orders: result });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await db.select().from(orders).where(eq(orders.id, id));

    return res.status(200).json({ order });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  // pega o user que criou o pedido

  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "Data not sent" });
  }

  try {
    const total =
      Math.round(
        products.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100,
      ) / 100;

    // const [order] = await db
    //   .insert(orders)
    //   .values({
    //     status: "Pendente",
    //     userId: Number(req.user.id),
    //     total,
    //   })
    //   .returning();

    const order = await db.transaction(async (tx) => {
      const [created] = await db
        .insert(orders)
        .values({
          status: "Pendente",
          userId: Number(req.user!.id),
          total,
        })
        .returning();

      await tx
        .insert(orderItems)
        .values(products.map((i) => ({ ...i, orderId: created!.id })));

      return created;
    });

    //jeito que fiz
    // const productsWithUserId = products.map((p) => ({
    //   ...p,
    //   orderId: order?.id,
    // }));

    // const order_items = await db
    //   .insert(orderItems)
    //   .values(productsWithUserId)
    //   .returning();

    return res.status(200).json({ order });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const editOrder = async (req: Request, res: Response) => {
  try {
    const ordersData = await db.select().from(orders);

    return res.status(200).json({ products: agrupados });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const ordersData = await db.select().from(orders);

    return res.status(200).json({ products: agrupados });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
