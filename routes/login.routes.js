import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/", loginUser);

export const loginRouter = router;
