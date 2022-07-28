import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import ProductPurchase from "../models/ProductPurchase.js";

const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  const {id} = req.params
  try {
    const productPurchases = await ProductPurchase.find({purchase: id});
    res.status(200).json({msg: "products of purchase " + id, data: productPurchases})
  } catch (error) {
    res.status(500).json({msg: 'Error'})
  }
});

export const productPurchaseRouter = router;