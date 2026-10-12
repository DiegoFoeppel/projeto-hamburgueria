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

const router = Router();

router.get("/", getProducts);
router.post("/", authMiddleware, authorizationMiddleware, createProduct);
router.post("/bulk", authMiddleware, authorizationMiddleware, createProducts);
router.get("/:id", getProductById);
router.patch("/:id", authMiddleware, authorizationMiddleware, editProduct);
router.delete("/:id", authMiddleware, authorizationMiddleware, deleteProduct);

export default router;
