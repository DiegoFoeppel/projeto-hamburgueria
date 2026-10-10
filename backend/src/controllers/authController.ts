import { type Request, type Response } from "express";
import db from "../db";
import { usersTable } from "../db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("email, ", email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "all fields must be filled" });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    console.log("email, ", user);

    if (!user) {
      return res.status(400).json({ message: "user doesnt exist" });
    }

    const validLogin = await bcrypt.compare(password, user.password);

    console.log("validlogin ", validLogin);

    if (!validLogin) {
      return res.status(404).json({ message: "wrong credentials" });
    }

    console.log("teste", process.env.JWT_SECRET, user.id);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7 days",
    });

    console.log("token", token);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cep: user.cep,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login not successful");
    return res.status(500).json({ error: err });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logout realizado" });
};
