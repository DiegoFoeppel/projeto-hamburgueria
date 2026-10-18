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
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getProducts);
router.get("/:id", getProductById);

router.use(authMiddleware, authorizationMiddleware);

router.post("/", upload.single("image"), createProduct);
router.post("/bulk", createProducts);
router.patch("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;
