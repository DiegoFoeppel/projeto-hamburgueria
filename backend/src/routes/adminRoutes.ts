import { Router } from "express";

import {
  createProduct,
  createProducts,
  getProducts,
  getProductById,
  deleteProduct,
  editProduct,
} from "../controllers/productsController.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorizationMiddleware } from "../middleware/roles.js";
import { createOrder, getOrderById } from "../controllers/ordersController.js";

const router = Router();

router.use(authMiddleware, authorizationMiddleware);

router.get("/orders", getProducts);
router.post("/orders/:id", getOrderById);
router.post("/orders", createOrder);

export default router;
