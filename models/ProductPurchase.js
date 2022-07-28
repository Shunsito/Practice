import mongoose from "mongoose";

const ProductPurchaseSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Purchase",
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
});

export default mongoose.model("ProductPurchase", ProductPurchaseSchema);
