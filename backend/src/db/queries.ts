import { and, eq, SQL } from "drizzle-orm";
import db from "./index";
import { productsTable, usersTable } from "./schema";
import bcrypt from "bcrypt";

export const getUser = async (id: number) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return user;
};

export const getProduct = async (id: number) => {
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));

  return product;
};

export const checkUser = async (email, password) => {
  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
    return true;
  }

  return false;
};
