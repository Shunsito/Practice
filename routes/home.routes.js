import express from "express";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.send("estas en home");
});

export const homeRouter = router;
