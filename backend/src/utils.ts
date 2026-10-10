import { and, eq, SQL } from "drizzle-orm";
import db from "./db";
import { usersTable } from "./db/schema";
import bcrypt from "bcrypt";

export const getUser = async (id: number) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return user;
};

export const checkUser = async (email, password) => {
  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
    return true;
  }

  return false;
};
