import mongoose from "mongoose";

const PurchaseSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Purchase", PurchaseSchema);
