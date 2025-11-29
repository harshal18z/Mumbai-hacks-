import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();
let wallets = {};

router.get("/", authRequired, (req, res) => {
  const balance = wallets[req.user.id] || 0;
  res.json({ balance });
});

router.post("/add", authRequired, (req, res) => {
  const { amount } = req.body;
  wallets[req.user.id] = (wallets[req.user.id] || 0) + Number(amount);
  res.json({ message: "Added funds", balance: wallets[req.user.id] });
});

router.post("/spend", authRequired, (req, res) => {
  const { amount } = req.body;
  if (wallets[req.user.id] < amount)
    return res.status(400).json({ error: "Insufficient funds" });
  wallets[req.user.id] -= amount;
  res.json({ message: "Spent successfully", balance: wallets[req.user.id] });
});

export default router;
