import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedRequest } from "./auth";
import { usersTable } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";
// import jwt from "jsonwebtoken";

export const authorizationMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user!.id;

    console.log("Id", id, typeof id);
    console.log("user");

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        nome: usersTable.nome,
        cep: usersTable.cep,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.id, Number(id)));

    console.log("user", user);

    if (!user || !(user.role === "ADMIN")) {
      return res.status(401).json({ error: "Access denied" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "User not authorized2" });
  }
};

// se for admin da bom se nao for ai da ruim
// const authHeader = req.headers["authorization"];
// const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

// if (!token) {
//   return res.status(401).json({ error: "Token de acesso necessário" });
// }

// const payload = jwt.verify(token, process.env.JWT_SECRET!);

// req.user = payload as JwtPayload;
// next();
