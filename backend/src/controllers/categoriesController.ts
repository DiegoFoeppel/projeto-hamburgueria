import { type Request, type Response } from "express";
import db from "../db/index.js";
import { categories, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoriesList = await db.select().from(categories);

    return res.status(200).json({ categories: categoriesList });
  } catch (error) {
    console.error("Error on deleting category", error);
    return res.status(500).json({ error: "Error on getting category deleted" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "provide an category id" });
    }

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, String(id)));

    if (!category) {
      return res.status(404).json({ message: "category doesnt exist" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Error on deleting category", error);
    return res.status(500).json({ error: "Error on getting category deleted" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, sortOrder } = req.body;

    if (!name || !sortOrder) {
      return res.status(400).json({ message: "Fields must be filled" });
    }

    const category = await db
      .insert(categories)
      .values({ name, sortOrder })
      .returning();

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Error on creating category", error);
    return res.status(500).json({ error: "Error on getting category created" });
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sortOrder } = req.body;

    if (!id) {
      return res.status(400).json({ message: "provide an category id" });
    }

    if (!name || !sortOrder) {
      return res.status(400).json({ message: "provide category infos" });
    }

    const updatedCategory = await db
      .update(categories)
      .set({ name, sortOrder })
      .where(eq(categories.id, String(id)))
      .returning();

    return res.status(200).json({ updatedCategory });
  } catch (error) {
    console.error("Error on deleting category", error);
    return res.status(500).json({ error: "Error on getting category deleted" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "provide an category id" });
    }

    const [removedCategory] = await db
      .delete(categories)
      .where(eq(categories.id, String(id)))
      .returning({ id: categories.id });

    if (!removedCategory) {
      return res.status(400).json({ message: "category doesnt exist" });
    }

    return res.status(200).json({ removedCategory });
  } catch (error) {
    console.error("Error on deleting category", error);
    return res.status(500).json({ error: "Error on getting category deleted" });
  }
};
