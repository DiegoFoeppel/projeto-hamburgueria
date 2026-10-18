import { type Request, type Response } from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { getUser } from "../utils.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export const getUserDetails = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        nome: usersTable.nome,
        cep: usersTable.cep,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(usersTable);

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error on getting users", err);
    return res.status(500).json({ error: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "provide user id" });
    }

    const user = await getUser(id);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error on getting user", error);
    return res.status(500).json({ error: "Error on gettings user data" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nome, email, password, cep } = req.body;

    if (!nome || !email || !password || !cep) {
      return res.status(400).json({ message: "all fields must be filled" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [user] = await db
      .insert(usersTable)
      .values({
        nome,
        email,
        password: passwordHash,
        cep,
      })
      .returning({ insertedId: usersTable.id });

    return res.status(201).json({ user });
  } catch (err) {
    console.error("Error on getting user", err);
    return res.status(500).json({ error: err });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const { nome, cep } = req.body;

    if (!id) {
      return res.status(400).json({ message: "provide user id" });
    }

    const user = await getUser(Number(id));

    if (!user) {
      return res.status(400).json({ message: "all fields must be filled" });
    }

    return res.status(200).json({ message: "user was updated" });
  } catch (error) {
    console.error("Error on editing user", error);
    return res.status(500).json({ error: "Error on editing user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "provide an user id" });
    }

    const [removedUser] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id });

    if (!removedUser) {
      return res.status(400).json({ message: "user doesnt exist" });
    }

    return res.status(200).json({ removedUser });
  } catch (error) {
    console.error("Error on deleting user", error);
    return res.status(500).json({ error: "Error on getting user deleted" });
  }
};
