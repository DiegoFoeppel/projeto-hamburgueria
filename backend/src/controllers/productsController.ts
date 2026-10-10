import { type Request, type Response } from "express";
import db from "../db/index.js";
import { productsTable, usersTable } from "../db/schema.js";
import { getUser } from "../utils.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { getProduct } from "../db/queries.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    // tem que agrupar pela categoria

    const products = await db.select().from(productsTable);

    const groups = Object.groupBy(products, (obj) => obj.category);

    const agrupados = Object.entries(groups).map(([category, products]) => ({
      category,
      products,
    }));

    return res.status(200).json({ products: agrupados });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "provide product id" });
    }

    const product = await getProduct(Number(id));

    if (!product) {
      return res.status(400).json({ message: "product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error("Error on getting user", error);
    return res.status(500).json({ error: "Error on gettings user data" });
  }
};

export const createProducts = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    console.log("Body", body);

    const productsToInsert = Array.isArray(body) ? body : [body];

    if (productsToInsert.length === 0) {
      return res.status(400).json({ error: "Nenhum produto enviado." });
    }

    const insertedProducts = await db
      .insert(productsTable)
      .values(productsToInsert)
      .returning(); // Retorna os produtos criados com seus respectivos IDs

    const data = Array.isArray(body) ? insertedProducts : insertedProducts[0];

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price, imgUrl } = req.body;

    if (!name || !description || !price || !imgUrl) {
      return res.status(400).json({ message: "all fields must be filled" });
    }

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.name, name));

    if (product) {
      return res.status(400).json({ message: "product already exists" });
    }

    const productCreated = await db.insert(productsTable).values({
      name,
      description,
      category,
      price,
      imgUrl,
    });

    return res.status(201).json({ productCreated });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "provide an product id" });
    }

    const [removedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning({ id: productsTable.id });

    if (!removedProduct) {
      return res.status(400).json({ message: "product doesnt exist" });
    }

    return res.status(200).json({ removedProduct });
  } catch (error) {
    console.error("Error on deleting product", error);
    return res.status(500).json({ error: "Error on getting product deleted" });
  }
};
