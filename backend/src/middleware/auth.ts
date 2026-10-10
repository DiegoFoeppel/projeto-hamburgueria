import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export interface JwtPayload {
  id: string;
  email: string;
  nome: string;
  cep: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Token de acesso necessário" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = payload as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }
};
