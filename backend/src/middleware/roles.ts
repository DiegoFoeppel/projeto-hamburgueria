import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedRequest, JwtPayload } from "./auth";
import { usersTable } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";
import { getUser } from "../db/queries";

export const authorizationMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user!.id;

    console.log("Id", id, typeof id);
    console.log("user");

    const user = await getUser(Number(id));

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
