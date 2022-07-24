import express from "express";
import cors from "cors";
import connectDB from "./database.js";
import dotenv from "dotenv";
import { homeRouter, loginRouter, registerRouter } from "./routes/index.js";
dotenv.config();

const app = express();

//connect database
connectDB();

//settings
app.use(cors());
app.use(express.json());

//middleware

//routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/", homeRouter);
//statix files

//starting the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
