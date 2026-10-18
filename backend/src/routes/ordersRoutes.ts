import { Router } from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUserId,
  deleteOrder,
  editOrder,
} from "../controllers/ordersController.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorizationMiddleware } from "../middleware/roles.js";

const router = Router();

router.get("/", getOrders);
router.post("/", authMiddleware, createOrder);
router.get("/user/:id", authMiddleware, getOrdersByUserId);
router.get("/:id", authMiddleware, authorizationMiddleware, getOrderById);
router.patch("/:id", authMiddleware, authorizationMiddleware, editOrder);
router.delete("/:id", authMiddleware, authorizationMiddleware, deleteOrder);

export default router;
