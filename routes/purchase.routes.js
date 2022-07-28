import express from "express";
import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
} from "../controllers/purchaseController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", auth, getPurchaseById);

router.get("/", auth, getPurchases);

router.post("/", auth, createPurchase);

router.delete("/:id", auth, deletePurchase);

export const purchaseRouter = router;
