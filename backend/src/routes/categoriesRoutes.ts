import { Router } from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  editCategory,
} from "../controllers/categoriesController.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorizationMiddleware } from "../middleware/roles.js";

const router = Router();

router.get("/", getCategories);
router.post("/", authMiddleware, createCategory);
router.get("/:id", authMiddleware, getCategoryById);
router.patch("/:id", authMiddleware, authorizationMiddleware, editCategory);
router.delete("/:id", authMiddleware, authorizationMiddleware, deleteCategory);

export default router;
