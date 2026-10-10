import { Router } from "express";

import {
  createUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
  getUserDetails,
} from "../controllers/usersController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/me", authMiddleware, getUserDetails);
router.get("/:id", getUserById);
router.patch("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
