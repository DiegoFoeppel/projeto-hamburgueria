import express from "express";
import usersRoutes from "./routes/usersRoutes";
import authRoutes from "./routes/authRoutes";
import productsRoutes from "./routes/productsRoutes";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

export { app };
export default app;
