import express from "express";
import usersRoutes from "./routes/usersRoutes";
import authRoutes from "./routes/authRoutes";
import productsRoutes from "./routes/productsRoutes";
import adminRoutes from "./routes/productsRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";

import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

console.log("Pasta de uploads:", uploadFolder);

app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static(uploadFolder));

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", categoriesRoutes);

export { app };
export default app;
