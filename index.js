import express from "express";
import cors from "cors";
import connectDB from "./database.js";
import dotenv from "dotenv";
import {
  homeRouter,
  loginRouter,
  registerRouter,
  productsRouter,
  purchaseRouter,
} from "./routes/index.js";
import { productPurchaseRouter } from "./routes/productPurchase.routes.js";
dotenv.config();

const app = express();

//connect database
connectDB();

//settings
app.use(cors());
app.use(express.json());

//middleware

//routes
app.use("/purchase", purchaseRouter);
app.use("/products", productsRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/product-purchase", productPurchaseRouter);
app.use("/", homeRouter);

//statix files

//starting the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
