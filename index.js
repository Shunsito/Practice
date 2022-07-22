import express from "express";
import cors from "cors";
import { homeRouter, registerRouter } from "./routes/index.js";
import connectDB from "./database.js";

const app = express();

connectDB();

//settings
app.use(cors());
app.use(express.json());

//middleware

//routes
app.use("/register", registerRouter);
app.use("/", homeRouter);
//statix files

//starting the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
