import { Router } from "express";

import {
  createProduct,
  createProducts,
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productsController.js";
// import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.post("/bulk", createProducts);
router.get("/:id", getProductById);
// router.patch("/:id", editUser);
router.delete("/:id", deleteProduct);

export default router;
