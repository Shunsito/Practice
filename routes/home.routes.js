import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("estas en home");
});

export const homeRouter = router;
