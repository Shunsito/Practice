import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductId,
} from "../controllers/productController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/:id", auth, editProduct);

router.delete("/:id", auth, deleteProduct);

router.get("/:id", auth, getProductId);

router.get("/", auth, getAllProducts);

router.post("/", auth, createProduct);

export const productsRouter = router;
